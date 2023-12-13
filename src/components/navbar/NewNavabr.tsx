import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ArticleIcon from "@mui/icons-material/Article"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import LogoutIcon from "@mui/icons-material/Logout"
import QuizIcon from "@mui/icons-material/Quiz"
import Typography from "@mui/material/Typography"
import { Link, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { signOut } from "../../features/auth/authSlice"

interface NewNavbarProps {
  drawerWidth: number
}

const NewNavbar: React.FC<NewNavbarProps> = ({ drawerWidth }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const location = useLocation()

  const noNavbar = ["/", "/login"]
  const showNavbar = !noNavbar.includes(location.pathname)

  const dispatch = useAppDispatch()

  const handleSingOut = () => {
    dispatch(signOut())
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          {
            text: "My question sets",
            icon: <ArticleIcon />,
            link: "/questionnaireUp",
          },
          { text: "Quiz", icon: <QuizIcon />, link: "/quizMenu" },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem key={"logout"} disablePadding>
          <ListItemButton onClick={handleSingOut}>
            <ListItemIcon>
              <LogoutIcon></LogoutIcon>
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )

  if (showNavbar) {
    return (
      <>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="nav folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </>
    )
  }
}
export default NewNavbar
