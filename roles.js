// =========================================================
// roles.js: Lógica de Control de Acceso Visual
// =========================================================

// 1. Funciones de Activación/Desactivación del Rol (Simulación de Login)
function activarModoAdmin() {
    // Establece el flag 'isAdmin' en true en el almacenamiento local
    localStorage.setItem('isAdmin', 'true');
    alert('Modo Administrador Activado. Los controles de Admin ahora están visibles.');
    window.location.reload(); 
}

function desactivarModoAdmin() {
    // Elimina el flag 'isAdmin'
    localStorage.removeItem('isAdmin');
    alert('Modo Cliente Activado. Los controles de Admin ahora están ocultos.');
    window.location.reload();
}

// 2. Función de Verificación de Rol
function verificarRol() {
    return localStorage.getItem('isAdmin') === 'true';
}

// 3. Aplicación de Estilos y Visibilidad al Cargar la Página
document.addEventListener('DOMContentLoaded', () => {
    const esAdmin = verificarRol();

    // A. Configurar el botón de Login/Logout
    const botonAdmin = document.getElementById('btn-admin');
    if (botonAdmin) {
        if (esAdmin) {
            // Si es Admin, el botón dirá "Salir de Admin"
            botonAdmin.textContent = 'Salir de Admin';
            botonAdmin.onclick = desactivarModoAdmin;
        } else {
            // Si es Cliente, el botón dirá "Entrar como Admin"
            botonAdmin.textContent = 'Entrar como Admin (Modo de Prueba)';
            botonAdmin.onclick = activarModoAdmin;
        }
    }
    
    // B. Mostrar/Ocultar elementos con la clase 'solo-admin'
    const elementosAdmin = document.querySelectorAll('.solo-admin');
    elementosAdmin.forEach(elemento => {
        if (!esAdmin) {
            // Ocultar si NO es administrador
            elemento.style.display = 'none';
        } else {
            // Mostrar si es administrador (restaurar a block, flex, etc., dependiendo del estilo)
            elemento.style.display = 'block'; 
        }
    });

    // C. Protección simple de la página 'admin.html'
    // Si estamos en admin.html y NO es Admin, redirigir
    if (window.location.pathname.endsWith('admin.html') && !esAdmin) {
        alert('Acceso Restringido. Necesitas ser Administrador.');
        window.location.href = 'index.html'; // Redirige al inicio
    }
});
