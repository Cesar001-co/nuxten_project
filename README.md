# Aplicativo Web con Angular, Firebase, postgreSQL y Spring Boot
Creación de un aplicativo Web para la curso de Usabilidad de la Institución Universitaria Colegio Mayor del Cauca, utilizando el framework Angular para el front-end y Spring Boot para el Back-end, junto con PostgreSQL y Firebase Database como base de datos.

### nuxten_project
<img src="https://github.com/Cesar001-co/nuxten_project/blob/2a1b6c6515276878417db7f9c6841f6b04bf2460/Capturas%20de%20pantalla%20nuxten/nuxten.jpg" alt="Imagen de Nuxten" height="520"/>
<p>¿Que es nuxten?</p>
nuxten (haciendo a referencia a Jakob Nilsen y su contribución a la experiencia del usuario (UX) en el desarrollo web, así como las diez heurísticas propuestas por él, para evaluar la usabilidad de los productos software), es una herramienta que se utiliza para medir la usabilidad de un producto de software. Esta herramienta se basa en los principios heurísticos propuestos por Jakob Nielsen, y utiliza un método de evaluación que consta de cuatro fases en total. A través de esta evaluación, se pueden identificar problemas y obtener información relevante sobre el nivel de usabilidad del producto de software en cuestión.
<img src="https://github.com/Cesar001-co/nuxten_project/blob/2a1b6c6515276878417db7f9c6841f6b04bf2460/Capturas%20de%20pantalla%20nuxten/Imagen11.png" alt="Imagen de Nuxten" width="470"/>

### Tecnologías Implementadas
| Tecnologías | Versión | Finalidad |
|--------------|------|----------|
| Angular | 15.2.10 | FrameWork para crear la interfaz de usuario y gestionar la interacción. |
| Spring Boot | 3.0.6 | FrameWork para proveer el backend y servicios API REST. |
| XAMP | 3.3.0 | Lanzar el front-end y back-end para configurar el servidor para desarrollo. |
| PostgreSQL | 14.8 | Gestionar la base de datos **Relacional** del proyecto. |
| Firebase | 16.0.0 | Gestionar la base de datos **No Relacional** del proyecto. |

### Esquema Tecnologias
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/Screenshot_1.png" alt="Imagen de Nuxten" width="520"/>

### Dependencias Implementadas
| Dependencia |	Tecnología |	Versión |	Finalidad |
|--------------|------|----------|----------|
| @angular/fire |	Angular |	16.0.0 | Integrar Firebase para autenticación y base de datos. |
| @angular-crumbs |	Angular |	3.0.1 |	Implementar rutas con migas de pan (breadcrumbs). |
| @chart.js |	Angular |	4.4.1 |	Crear gráficos interactivos. |
| @ngx-cookie-service |	Angular |	15.0.0 |	Gestionar cookies en el frontend. |
| @pdfmake |	Angular |	0.2.8 |	Generar documentos PDF desde el frontend. |
| Tomcat |	Spring Boot |	3.0.6 |	Servir aplicaciones Java y manejar peticiones HTTP. |
| Tomcat-Jasper |	Spring Boot |	10.1.8 |	Compilar y ejecutar archivos JSP. |
| Tomcat-Jasper |	XAMPP |	10.1 |	Compilar archivos JSP en el entorno local. |



## Visualización y funcionamiento del aplicativo Nuxten
A continuación capturas de pantalla y un video explicativo con el funcionamiento y manejo del aplicativo Nuxten.
<br>
[FUNCIONAMIENTO (video)](https://drive.google.com/file/d/1IrFcfc0xKTXOUgOAstGro95SzYBZY7hC/view?usp=sharing)

### Esquema Base de Datos
Manejo de las tablas en la base de datos
<br>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/2a1b6c6515276878417db7f9c6841f6b04bf2460/Capturas%20de%20pantalla%20nuxten/captura%20022.png" alt="Imagen de Nuxten" height="520"/>

### Validar usuarios
Este apartado estará disponible para todos los usuarios y por medio de esta pantalla podrá acceder y validar el ingreso al aplicativo.
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20001.jpg" alt="Imagen de Nuxten" height="320"/>

### Interfaz Menu lateral
El menú cambiará su disposición de funciones teniendo en cuenta el tipo de usuario, es decir, para 
el usuario administrador estarán disponibles todos los apartados, mientras que para los usuarios
expertos estarán limitados a ciertas funcionalidades.
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20002.jpg" alt="Imagen de Nuxten" width="820"/>
### Interfaz de Bienvenida
Esta pantalla presenta una descripción sobre el aplicativo y su finalidad, también hace mención a
los autores y estatutos de la universidad.
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20003.jpg" alt="Imagen de Nuxten" width="820"/>

### Gestionar expertos
<p>Esta pantalla tiene la finalidad de realizar la gestión de los expertos, este brinda acceso a las
funcionalidades de agregar, modificar y eliminar un experto, además de buscarlo por su
identificacion. Apartado que solo estará disponible para el usuario administrador.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20004.jpg" alt="Imagen de Nuxten" width="820"/>
<p>Esta pantalla tiene la finalidad de realizar el registro de usuarios al sistema ademas de modificación de la información del experto. Apartado que solo estará
disponible para el usuario administrador.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20005.jpg" alt="Imagen de Nuxten" width="820"/>
### Gestionar evaluaciones
<p>Esta pantalla permite realizar la gestión sobre las evaluaciones que se encuentran creadas. Brinda
acceso a la interfaz de crear evaluación y también a las acciones de eliminar evaluación y consultar
evaluación.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20006.jpg" alt="Imagen de Nuxten" width="820"/>
<p>Esta pantalla permite realizar la creación y asignación de los expertos a una evaluación. Tambien visualizar la información relacionada a la evaluación, fase o estado actual,
información de los expertos y del sitio evaluado.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20007.jpg" alt="Imagen de Nuxten" width="820"/>
### Realizar evaluación
<p>En este apartado podrán realizar evaluaciones tanto los usuarios expertos como también el usuario
administrador que también puede agregarse a sí mismo a una evaluación.</p>
<p>Esta pantalla permite a uno de los expertos ingresar la información relacionada al sitio que se va a
evaluar. En ese momento la evaluación estará en fase o estado creada.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20008.jpg" alt="Imagen de Nuxten" width="820"/>
<p>Esta pantalla permite visualizar la información relacionada a la evaluación, también la información
de los expertos asignados y acceso a las fases de la evaluación.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20010.jpg" alt="Imagen de Nuxten" width="820"/>
<hr>
<p>En esta pantalla podremos visualizar la descripción de la fase actual, los principios heurísticos, la
acción para agregar problemas y la tabla que se genera a partir de estos. Esta fase de la evaluación
se realiza de manera individual y es el último experto en finalizar la fase es el encargado de cambiar
la fase</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20011.png" alt="Imagen de Nuxten" width="820"/>
<p>Esta pantalla permite agregar la descripción, definición y heristicias incumplidas en el sitio a evaluar.
Estos problemas se agregan de manera individual.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20012.png" alt="Imagen de Nuxten" width="820"/>
<hr>
<p>En esta pantalla podremos visualizar la descripción de la fase actual, una lista de problemas
registrados por los expertos y la acción de subir evidencia para el problema seleccionado. Esta fase
es grupal, se agrupan los problemas generados en la fase anterior por todos los expertos y se
seleccionan de estos los definitivos y de mayor importancia para los expertos. Esta fase es finalizada
por el último experto en presionar el botón finalizar fase.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20013.png" alt="Imagen de Nuxten" width="820"/>
<hr>
<p>En esta pantalla podremos visualizar la descripción de la fase actual, la descripción de los valores a
calificar en esta evaluación, y la tabla con los problemas seleccionados en la fase anterior por los
expertos. Esta fase es individual y cada experto bajo su criterio y conocimiento calificará cada
problema según su nivel de severidad y frecuencia. Solo finalizará la fase cuando el último experto
presione el botón de finalizar fase.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20014.png" alt="Imagen de Nuxten" width="820"/>
<hr>
<p>En esta pantalla podremos visualizar la descripción de la fase actual, también la tabla de frecuencia
y desviación estándar generada a partir de la calificación agrupada de los expertos y gestionada a
partir de fórmulas para la generación de estos valores. Además, la gráfica de desviación estándar
generada a partir de la criticidad y al finalizar la opción de agregar propuestas de solución para los
problemas encontrados en el sitio evaluado. Esta fase es grupal, y solo se finaliza hasta que el último
experto presione el botón finalizar fase, también es esta acción la que finaliza la evaluación y genera el reporte. Es importante recalcar que ninguna de las fases ya finalizadas no podrán ser editadas por
ningún usuario.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20015.jpg" alt="Imagen de Nuxten" width="820"/>
<p>En esta pantalla podrás añadir la solución del problema, en donde podrás visualizar información
relevante del problema a solucionar.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20016.png" alt="Imagen de Nuxten" width="820"/>

### Almacenar evaluación
<p>Esta pantalla permite visualizar a los expertos la evaluación realizada y al administrador todas las
evaluaciones ya finalizadas. Desde este apartado podrá descargar y eliminar el reporte generado
por la evaluación.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/captura%20017.png" alt="Imagen de Nuxten" width="820"/>

### Generar reporte
<p>Al descargar el reporte se genera un documento pdf con el resumen de toda la evaluacion y evidencias.</p>
<img src="https://github.com/Cesar001-co/nuxten_project/blob/3e31c72424ee3b9de9497db7944345dfae812f05/Capturas%20de%20pantalla%20nuxten/Screenshot_2.png" alt="Imagen de Nuxten" width="520"/>

