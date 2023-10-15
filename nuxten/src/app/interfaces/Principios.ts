export interface Principio {
    heuristica: string,
    nombre: string,
    descripcion: string
}

export const listaPrincipios: Principio[] = [
    { heuristica: 'H1', nombre: 'Visibilidad del sistema', descripcion: 'El diseño debe mantener siempre informados a los usuarios cuál es el estado del sistema en cada momento, y mantenerle informado de lo que está pasando.' },
    { heuristica: 'H2', nombre: 'Consistencia entre el sistema y el mundo real', descripcion: 'El diseño debe hablar el idioma de los usuarios. Utilice palabras, frases y conceptos familiares para el usuario, en lugar de jerga interna. Siga las convenciones del mundo real, haciendo que la información aparezca en un orden natural y lógico.' },
    { heuristica: 'H3', nombre: 'Control y libertad para el usuario', descripcion: 'El usuario debe poder navegar libremente, encontrar con facilidad “salidas” y “rutas alternativas”.' },
    { heuristica: 'H4', nombre: 'Consistencia y estandares', descripcion: 'Establecer unas convenciones lógicas y mantenerlas siempre (mismo lenguaje, mismo flujo de navegación)' },
    { heuristica: 'H5', nombre: 'Prevención de errores', descripcion: 'Tratar de evitar que los errores ocurran (advertencias), Los mensajes de error son importantes, pero los mejores diseños evitan cuidadosamente que se produzcan problemas en primer lugar' },
    { heuristica: 'H6', nombre: 'Reconocimiento antes que reacción', descripcion: 'El usuario debe saber intuitivamente como se hace algo, no se puede esperar que los usuarios recuerden o memoricen información, se debe mostrar si es necesaria en el proceso, las instrucciones deben estar a la vista cuando sea necesario' },
    { heuristica: 'H7', nombre: 'Flexibilidad y eficiencia de uso', descripcion: 'Permite que el sistema pueda adaptarse a los usuarios frecuentes. ' },
    { heuristica: 'H8', nombre: 'Diseño estético y minimalista ', descripcion: 'Muestra sólo lo necesario y relevante en cada situación, no debe distraer al usuario con información extra poco relevante' },
    { heuristica: 'H9', nombre: 'Ayuda a los usuarios a reconocer y corregir sus errores', descripcion: 'Los mensajes de error deben expresarse en lenguaje sencillo (sin códigos de error), indicar con precisión el problema y siguiere una solución.' },
    { heuristica: 'H10', nombre: 'Ayuda y documentación', descripcion: 'lo ideal es que un sistema sea tan intuitivo que no requiera explicación adicional, pero en algunos casos puede ser necesario proporcionar documentación para ayudar a los usuarios a entender cómo completar sus tareas.' }
]