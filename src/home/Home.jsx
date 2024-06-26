/* eslint-disable react/prop-types */
import {NavbarSearch} from '../components/NavAside'
import '../../styles/Home.css'

const Home = ({children}) => {
  return (
    <div>
        <aside>
            <NavbarSearch/>
        </aside>
        <main id='mainHome'>
            {children}
        </main>
    </div>
  )
}

export default Home