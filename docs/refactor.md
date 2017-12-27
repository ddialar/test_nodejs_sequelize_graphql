# Propuesta de refactorización

Como puedes apreciar, he modificado "un poco" la estructura del server y a continuación te comento el por qué.

## GraphQL

### Organización de directorios

En el directorio de `graphql` tenías un único archivo (`schema.js`) dentro del cual, tenías definido los modelos, las queries, las mutaciones y el propio esquema.

Entiendo que esto lo hiciste así porque este código se trata de una prueba de concepto.

No obstante, he modificado la estructura de dicho directorio de manera que ahora tienes separada la definición de los modelos, las queries y las mutaciones, en sus correspondientes directorios.

Además de esto, dentro de los directorios `mutations` y `queries` también the dividido por la entidad con la que se vaya a trabajar. De este modo, todo lo que tenga que ver con usuarios siempre estará dentro su directorio específico, al igual que sucederá con los posts. De esta forma, evitamos tener múltiples archivos, de entidades diferentes, juntos en el mismo directorio.

### Definición de modelos de datos

He visto que en los objetos tipo, por cada campo has definido una función resolve. Esto no es necesario salvo que vayas a devolver otro objeto tipo, como es en el caso de los posts, donde el campo `user` es de tipo `User`.

En estos casos excepcionales, lo que tendrás que hacer es implementar la interfaz adecuada para que, con la información del objeto tipo padre (el post en este caso), puedas realizar la búsqueda del usuario en cuestión y devolverlo.

### Funciones resolve() dentro de mutaciones y queries

Como puedes ver, en todas las funciones `resolve()` de mutaciones y queries, he proporcionado el parámetro de entrada `context`. Este es el tercer parámetro que admiten las funciones `resolve` y nos permiten inyectar en las mismas, funciones, constantes, variables, etc. que definimos cuando implementamos el endpoint en el archivo `server.js`.

En dicho contexto, lo que he hecho es definir un atributo `database` que tendrá las operaciones relacionadas con la capa de persistencia.

De este modo, en el caso de que tengas que refactorizar dicha capa de persistencia, sólo tendrás que modificar el objeto que se pasa al contexto y no el código de GraphQL. Así conseguimo un mayor nivel de aislamiento entre GraphQL y los demás módulos de la aplicación.

## Interfaz 'database'

Esta interfaz está implementada en el directorio `database`.

Aquí lo que he hecho es importar una serie de servicios correspondientes al motor de base de datos/ORM que estás usando actualmente, es decir, `sequlize`.

Esto está hecho con la idea de que, el día de mañana cambias, por ejemplo a MySQL por requisitos o mejora de la aplicación, sólo tendrías que implementar los servicios de dicho motor de base de datos y refactorizar la interfaz `database`. De este modo, el resto de la aplicación *"no se vería afectado"*.

## ORM Sequelize

Con respecto a este ORM, lo que he hecho es aislar todas sus funcionalidades dentro del correspondiente directorio, viéndolo como su de un módulo independiente de la aplicación se tratara.

El elemento de comunicación con el exterior de dicho módulo serán los servicios implementados en el directorio `services`. Aquí he implementado un archivo por cada entidad con la que trabaja la aplicación.

Serán estos servicios lo que consumirá la interfaz `database` y ésta a su vez, será consumida por GraphQL a través de su contexto.

## Server y contexto de GraphQL

Finalmente, lo que he hecho en el archivo `server.js` es importar la interfaz `database` e inyectarla en el contexto del endpoint de GraphQL.

De esta manera y tal y como te indiqué antes, las funciones definidas en `database` estarán disponibles en cualquier función `resolve()` usada por GraphQL.

# Conclusiones

Con la modificación que te propongo, conseguimos un aislamiento completo entre el módulo de GraphQL y el módulo que implementa la capa de persistencia.

El elemento que conectará ambos módulos será la interfaz `database` (que se puede llamar de cualquier otra manera siempre y cuando, sea claramente identificable su funcionalidad).