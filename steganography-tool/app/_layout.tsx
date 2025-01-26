import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from './index';
import EncodePage from './encode-page';
import DecodePage from './decode-page';
import Ionicons from '@expo/vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export default function MyDrawer(){
  return(
    <Drawer.Navigator screenOptions={{
      drawerStyle:{
        backgroundColor:'#f8f9fa',
        width:240
      },
      drawerLabelStyle: {
        fontSize: 16,
        color: '#333',
      },
    }}>
      <Drawer.Screen name="Home" component={MainPage} options={{
        drawerIcon:({color,size}) => <Ionicons name="home" size={24} color="black" />
      }}/>
      <Drawer.Screen name="Encryption" component={EncodePage} options={{
        drawerIcon:({color,size}) => <Ionicons name="lock-closed" size={24} color="black" />
      }}/>
      <Drawer.Screen name="Decryption" component={DecodePage} options={{
        drawerIcon:({color,size}) => <Ionicons name="lock-open" size={24} color="black" />
      }}/>
    </Drawer.Navigator>
  )
}