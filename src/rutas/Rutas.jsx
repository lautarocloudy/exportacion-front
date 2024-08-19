import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { PublicLayout } from "../Components/empresa1/publictLayout";
import { Login } from "../Components/usuarios/login";
import { Logout } from "../Components/usuarios/Logout";
import { PrivateLayout } from "../Components/layout/PrivateLayout";
import { CrearClaves } from "../Components/clavesImpositivas/clavesFiscales/CrearClave";
import ListaClave from "../Components/clavesImpositivas/clavesFiscales/ListaClave";
import { VerClaves } from "../Components/clavesImpositivas/clavesFiscales/VerClaves";
import { EditarClaves } from "../Components/clavesImpositivas/clavesFiscales/EditarClaves";
import { CrearEgreso } from "../Components/ingresoEgreso/Egreso";
import { CrearIngreso } from "../Components/ingresoEgreso/Ingreso";
import { ResultadoIngresoEgreso } from "../Components/ingresoEgreso/ResultadoIngresoEgreso";

export const Rutas = () => {
    return (
        <BrowserRouter>
            <AuthProvider>

                <section id="content" className="content">
                    <Routes>
                        <Route path='/' element={<PublicLayout />}>
                            <Route index element={<Login />} />
                            <Route path='login' element={<Login />} />
                        </Route>
                        <Route path='/social' element={<PrivateLayout />}>
                            <Route index element={< CrearClaves/>} />
                            <Route path="crear-claves-fiscal" element={<CrearClaves />} />
                             <Route path="lista-claves-fiscal" element={<ListaClave />} />
                             <Route path="ver-clave-fiscal/:id" element={<VerClaves />} />
                             <Route path="editar-clave-fiscal/:id" element={<EditarClaves />} />
                             <Route path="cargar-egreso" element={<CrearEgreso />} />
                             <Route path="cargar-ingreso" element={<CrearIngreso />} />
                             <Route path="Resultado-Ingreso-Egreso" element={<ResultadoIngresoEgreso />} />


                            
                            <Route path="salir" element={<Logout />} />
                        </Route>
                    
                        <Route path='*' element={
                            <>
                                <h1>Error 404</h1>
                                <Link to="/">Volver a inicio</Link>
                            </>

                        } />
                    </Routes>
                </section>
            </AuthProvider>
        </BrowserRouter>
    );
}