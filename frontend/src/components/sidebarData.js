import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';


const sidebardata = [

    {
        title: "Profile",
        path: "/Profile",
        icon: <PersonIcon/>
    },


    {
        title: "Home",
        path: "/Home",
        icon: <HomeIcon/>
    },

    {
        title: "Menu",
        path: "/Menu",
        icon: <MenuBookIcon/>
    },

    {
        title: "Upcoming orders",
        path: "/Orders",
        icon: <ChecklistRtlIcon/>
    },

    {
        title: "Sales History",
        path: "/SalesHistory",
        icon: <HistoryIcon/>
    },

    {
        title: "Payments",
        path: "/Payment",
        icon: <PaymentsIcon/>
    },

    {
        title: "Logout",
        path: "/",
        icon: <LogoutIcon/>
    }
]

export default sidebardata;