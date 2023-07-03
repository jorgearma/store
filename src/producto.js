const producto = document.getElementById('producto');
const prodcutoimagen = producto.querySelector('.producto__imagen');
const thumbs = producto.querySelector('.producto__thumbs');
//color
const propiedacolor = producto.querySelector('#propiedad-color')
//botones de menos y mas
const disminuciondecantida =  producto.querySelector('#disminuir-cantidad')
const incremnetodecantida =  producto.querySelector('#incrementar-cantidad')
const inputcantida = producto.querySelector('#cantidad')


//los clicks  en la fotos de la izquierda
thumbs.addEventListener('click',  (e) => {        
    if(e.target.tagName === 'IMG'){                                         //hacemso el if para que nos muestre solo 'IMG'

        const imagensrc = e.target.src;                                   //sacamos la infmacion src de IMG
        const lastindex = imagensrc.lastIndexOf('/');                     //la cortamos en el ultimo '/'  => /1.jpg
        const nombreimagen = imagensrc.substring(lastindex +1);           //agregamos uno mas para borrar '/' => 1.jpg

        //entramos a producto  para cambiar el src con el que nos da el click "e"
        prodcutoimagen.src = `./img/tennis/${nombreimagen}`;
    }

});

//click en color
propiedacolor.addEventListener('click', (e) =>{
    if(e.target.tagName === 'INPUT'){                             //como hay un  contenedor  le especificamos que tiene que ser INPUT
       
        prodcutoimagen.src =`./img/tennis/${e.target.value}.jpg`;  //cambiamos la ruta de la imagen principall
                                                                   //con el valor de  e.target.value    
       
    }
})

//sumar y restar cantida
incremnetodecantida.addEventListener('click',(e) => {
    inputcantida.value = parseInt(inputcantida.value) +1 ; //caundo hay un click  suamos su
                                                           //.value + 1

});

disminuciondecantida.addEventListener('click',(e) => {
    if(parseInt(inputcantida.value) > 1){        
    inputcantida.value = parseInt(inputcantida.value) -1 ; 
    }
     
});