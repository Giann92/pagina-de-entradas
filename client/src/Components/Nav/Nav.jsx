import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from '@react-oauth/google';
import { logOut, postLogin } from "../../Redux/Action/action";
import * as navStyles from "./navStyles"
import styles from "./Nav.module.css"
import Swal from "sweetalert2";
import styled from "styled-components"
import Car from "../Car/Car";

const Hamburguer = styled.div`
min-height: ${(props) => (props.isOpen ? '100vh' : '60px')};
transition: min-height 0.3s ease-in-out;
overflow: hidden;
`

const Nav = (props) => {
  const userSesion = useSelector((state) => state.userSesion);
  const dispatch = useDispatch();

  function handleCallbackResponse(response) {
    const user = { platform: "google", jwt: response.credential };
    dispatch(postLogin(user));
  }

  function errorMessage(response) {
    Swal.fire({
      title: "Error",
      text: `${response}`,
      icon: "error",
    });
  }

  //Hamburguer icon /MiPerfil

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handlePress = () => {
    setIsMenuOpen(false);
  }

  const handleMenu = () => {
    console.log(isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }

  const [windowWidth, setWindowWitdth] = useState(0);

  window.addEventListener("resize", updateWindowWith);

  function updateWindowWith() {
    setWindowWitdth(window.innerWidth)
  }

  useEffect(() => {
    setWindowWitdth(window.innerWidth);
  }, [])

  if (windowWidth <= 860) {
    if (Object.keys(userSesion).length === 0) {
      return (

        <Hamburguer isOpen={isMenuOpen} className={navStyles.navClasses}>
          <div className={`${navStyles.containerClassesMobile} flex justify-between items-center`} id="navwrap">
            <div className="dark:border-gray-600 grid grid-cols-2 z-50 dark:bg-gray-900">

              <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
              <button className="place-self-end	mx-10" onClick={handleMenu}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" fill="white" viewBox="0 0 50 50">
                <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
              </svg>
              </button>
            </div>
            <div className={styles.rotatingBar}></div>
            <div className={navStyles.linkContainerClassesMobile} id="container">
              <Link to="/login" ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Inicia Sesión</span></button></Link>
              <Link to="/register" ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Registrate</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses} onClick={handlePress}><span>Preguntas Frecuentes</span></button></Link>
              <Link to="/about" ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Nosotros</span></button></Link>
              <div className="place-self-center mb-2">
                <GoogleLogin onSuccess={handleCallbackResponse} onError={errorMessage} />
              </div>
              <Car />
            </div>
          </div>
        </Hamburguer>
      );
    };

    let isAdmin = false;
    let isSeller = false;

    userSesion.roles.forEach(role => {
      isAdmin = isAdmin || role === "admin";
      isSeller = isSeller || role === "seller";
    });

    if (isSeller && !isAdmin) {
      return (
        <Hamburguer isOpen={isMenuOpen} className={navStyles.navClasses}>
          <div className={`${navStyles.containerClassesMobile} flex justify-between items-center`} id="navwrap">
            <div className="dark:border-gray-600 grid grid-cols-2 z-50 dark:bg-gray-900">

              <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
              <button className="place-self-end	mx-10" onClick={handleMenu}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" fill="white" viewBox="0 0 50 50">
                <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
              </svg></button>
            </div>
            <div className={navStyles.linkContainerClassesMobile} id="container">
              <Link to='/createEvent' ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Crear Evento</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Preguntas Frecuentes</span></button></Link>
              <Link to="/about" ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Nosotros</span></button></Link>
              <Link to='/myEvents'><button className={navStyles.buttonClasses} onClick={handlePress}><span >Mis Eventos</span></button></Link>
              <Link to='/MiPerfil' ><button className={navStyles.buttonClasses} onClick={handlePress}><span class="relative z-10">Mi Perfil</span></button></Link>
              <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span >Cerrar Sesión</span></button>
              <Car />
            </div>
          </div>
          <div className={styles.rotatingBar}></div>
        </Hamburguer>
      );
    };

    if (isAdmin) {
      return (
        <Hamburguer isOpen={isMenuOpen} className={navStyles.navClasses}>
          <div className={`${navStyles.containerClassesMobile} flex justify-between items-center`} id="navwrap">
            <div className="dark:border-gray-600 grid grid-cols-2 z-50 dark:bg-gray-900">

              <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
              <button className="place-self-end	mx-10" onClick={handleMenu}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" fill="white" viewBox="0 0 50 50">
                <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
              </svg></button>
            </div>
            <div className={styles.rotatingBar}></div>
            <div className={navStyles.linkContainerClassesMobile} id="container">
              <Link to='/createEvent' ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Crear Evento</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Preguntas Frecuentes</span></button></Link>
              <Link to="/about" ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Nosotros</span></button></Link>
              <Link to='/myEvents'><button className={navStyles.buttonClasses} onClick={handlePress}><span >Mis Eventos</span></button></Link>
              <Link to='/Admin/Panel'><button className={navStyles.buttonClasses} onClick={handlePress}><span >Dashboard</span></button></Link>
              <Link to='/MiPerfil' ><button className={navStyles.buttonClasses} onClick={handlePress}><span class="relative z-10">Mi Perfil</span></button></Link>
              <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span >Cerrar Sesión</span></button>
              <Car />
            </div>
          </div>
          
        </Hamburguer>
      );
    };

    return (
      <Hamburguer isOpen={isMenuOpen} className={navStyles.navClasses}>
        <div className={`${navStyles.containerClassesMobile} flex justify-between items-center`} id="navwrap">
          <div className="dark:border-gray-600 grid grid-cols-2 z-50 dark:bg-gray-900">
            <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
            <button className="place-self-end	mx-10" onClick={handleMenu}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" fill="white" viewBox="0 0 50 50">
              <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
            </svg></button>
          </div>
          <div className={styles.rotatingBar}></div>
          <div className={navStyles.linkContainerClassesMobile} id="container">
            <Link to='/FAQ' ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Preguntas Frecuentes</span></button></Link>
            <Link to="/about" ><button className={navStyles.buttonClasses} onClick={handlePress}><span >Nosotros</span></button></Link>
            <Link to='/MiPerfil' ><button className={navStyles.buttonClasses} onClick={handlePress}><span class="relative z-10">Mi Perfil</span></button></Link>
            <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span >Cerrar Sesión</span></button>
            <Car />
          </div>
        </div>
        
      </Hamburguer>
    );
  }
  else {
    if (Object.keys(userSesion).length === 0) {
      return (
        <nav className={navStyles.navClasses}>
          <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
            <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
            <div className={navStyles.linkContainerClasses}>
              <Link to="/login" ><button className={navStyles.buttonClasses}><span class="relative z-10">Inicia Sesión</span></button></Link>
              <Link to="/register" ><button className={navStyles.buttonClasses}><span class="relative z-10">Registrate</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
              <Link to="/about" ><button className={navStyles.buttonClasses}><span >Nosotros</span></button></Link>
              <GoogleLogin onSuccess={handleCallbackResponse} onError={errorMessage} />
              <Car />
            </div>
          </div>
          <div className={styles.rotatingBar}></div>
        </nav>
      );
    };

    let isAdmin = false;
    let isSeller = false;

    userSesion.roles.forEach(role => {
      isAdmin = isAdmin || role === "admin";
      isSeller = isSeller || role === "seller";
    });

    if (isSeller && !isAdmin) {
      return (
        <nav className={navStyles.navClasses}>
          <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
            <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
            <div className={navStyles.linkContainerClasses}>
              <Link to='/createEvent' ><button className={navStyles.buttonClasses}><span class="relative z-10">Crear Evento</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
              <Link to="/about" ><button className={navStyles.buttonClasses}><span >Nosotros</span></button></Link>
              <Link to='/myEvents'><button className={navStyles.buttonClasses}><span class="relative z-10">Mis Eventos</span></button></Link>
              <Link to='/MiPerfil' ><button className={navStyles.buttonClasses}><span class="relative z-10">Mi Perfil</span></button></Link>
              <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span class="relative z-10">Cerrar Sesión</span></button>
              <Car />
            </div>
          </div>
          <div className={styles.rotatingBar}></div>
        </nav>
      );
    };

    if (isAdmin) {
      return (
        <nav className={navStyles.navClasses}>
          <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
            <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
            <div className={navStyles.linkContainerClasses}>
              <Link to='/createEvent' ><button className={navStyles.buttonClasses}><span >Crear Evento</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
              <Link to="/about" ><button className={navStyles.buttonClasses}><span >Nosotros</span></button></Link>
              <Link to='/myEvents'><button className={navStyles.buttonClasses}><span class="relative z-10">Mis Eventos</span></button></Link>
              <Link to='/Admin/Panel'><button className={navStyles.buttonClasses}><span >Dashboard</span></button></Link>
              <Link to='/MiPerfil' ><button className={navStyles.buttonClasses}><span class="relative z-10">Mi Perfil</span></button></Link>
              <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span class="relative z-10">Cerrar Sesión</span></button>
              <Car />
            </div>
          </div>
          <div className={styles.rotatingBar}></div>
        </nav>
      );
    }
    return (
      <nav className={navStyles.navClasses}>
        <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
          <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
          <div className={navStyles.linkContainerClasses}>
            <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
            <Link to="/about" ><button className={navStyles.buttonClasses}><span >Nosotros</span></button></Link>
            <Link to='/MiPerfil' ><button className={navStyles.buttonClasses}><span class="relative z-10">Mi Perfil</span></button></Link>
            <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span class="relative z-10">Cerrar Sesión</span></button>
            <Car />
          </div>
        </div>
        <div className={styles.rotatingBar}></div>
      </nav>
    );
  };
}

export default Nav;