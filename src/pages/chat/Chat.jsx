import { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
//import "./styles/styles.css"
import { StreamChat } from "stream-chat";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ChatPannel = () => {
  const { channelId, authorId } = useParams(); 
  const auth = useAuth();
  const { uid, displayName, photoURL } =
    auth.user || JSON.parse(localStorage.getItem("user"));
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const apiKey = import.meta.env.VITE_CHAT_API_KEY;
  const userId = uid;

  useEffect(() => {
  
    const setupClient = async () => {
      try {
        const response = await fetch(
          `https://generator-token-lambda.vercel.app/auth/token/${userId}`
        ).then((res) => res.json());

        if (!response.success) {
          throw new Error("Error fetching token from backend");
        }

        const token = await response.data;

        const chatClient = StreamChat.getInstance(apiKey);
        await chatClient.connectUser(
          {
            id: userId,
            name: displayName,
            image: photoURL,
          },
          token
        );

        setClient(chatClient);
        setLoading(false);
        if(authorId === uid) return
        // Enviar mensaje por defecto cuando el cliente y el canal estén listos
        //const channel = chatClient.channel("messaging", channelId); // 'messaging' es el tipo de canal
        const channel = chatClient.channel("messaging", channelId, {
          members: [userId, authorId], // Añadir el usuario como miembro del canal
        });
        await channel.watch(); 

        const defaultMessage = {
          text: "¡Bienvenido al chat! Espera a que el tutor responda a tu solicitud 🚀",
          user_id: userId,
        };

        await channel.sendMessage(defaultMessage); // Enviar mensaje por defecto
      } catch (error) {
        console.error("Error setting up chat client:", error);
      }
    };

    setupClient();

    // Cleanup: Desconectar el cliente al desmontar el componente
    return () => {
      if (client) client.disconnectUser();
    };
  }, [userId, channelId, apiKey, client]); // Agregamos dependencias correctas

  useEffect(() => {
    const accessState = () => {
      const docRef = doc(db, "waiting_rooms", channelId);
      
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (!doc.exists()) return;
        const data = doc.data();
        if (data.accessState === "granted") {
          navigate(`/home/loading/call/${data.roomId}`);
        }
        if (data.accessState === "denied") {
          navigate("/home");
        }
      });
      
      return unsubscribe;
    };
  
    const unsubscribe = accessState();
    return () => unsubscribe();
  
  }, [channelId, navigate]);
  

  if (loading || !client ) return <div>Loading...</div>;

  return (
    <Chat client={client} theme="str-chat__theme-dark">
      <Channel channel={client.channel("messaging", channelId)}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatPannel;
