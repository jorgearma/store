'use strict';

const producto$1 = document.getElementById('producto');
const prodcutoimagen = producto$1.querySelector('.producto__imagen');
const thumbs = producto$1.querySelector('.producto__thumbs');
//color
const propiedacolor = producto$1.querySelector('#propiedad-color');
//botones de menos y mas
const disminuciondecantida =  producto$1.querySelector('#disminuir-cantidad');
const incremnetodecantida =  producto$1.querySelector('#incrementar-cantidad');
const inputcantida = producto$1.querySelector('#cantidad');


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
});

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

var data = {
    producto:[
        {
            id:'1',
            nombre:'Tennis Converse Standard.',
            descripcion:'Lorem ipsum dolor sit amet.',
            precio: 500.0,
            colores:['negro','rojo','amarilo'],
            Tamaño:['1.5','2','2,5','3','3,5'],
        },
        {
            id:'2',
            nombre:'Tennis Converse2 Standard.',
            descripcion:'Lorem ipsum dolor sit amet.',
            precio: 450.0,
            colores:['negro','rojo','amarilo'],
            Tamaño:['1.5','2','2,3'],
        }
    ]
};

const botonesabrircarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const botonescerrarcarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const botonagregarcarrito = document.getElementById('agregar-al-carrito');
const ventanacarrito = document.getElementById('carrito');
const producto = document.getElementById('producto');
let carrito = [];
const formatearmoneda = new Intl.NumberFormat('es-ES', {style:'currency', currency:'EUR'});
const notificacion = document.getElementById('notificacion');

//rederizamos el carrito 
const rendercarrito = () =>{
    ventanacarrito.classList.add('carrito--active');   //anadido active para que salga la ventana
    
    //aqui solucionamos el bug de duplicado
    const productoanteriores = ventanacarrito.querySelectorAll('.carrito__preducto');
    productoanteriores.forEach((producto) => producto.remove() );
    
    let total = 0;

    //comprovando prodcuto 
    if(carrito.length < 1){
        ventanacarrito.classList.add('carrito--vacio');


    }else {
        ventanacarrito.classList.remove('carrito--vacio');    
    //aqui creamos y agregamos los prodcutos al carrito
    carrito.forEach((productocarrito) => {
    //toamos el precio de la base de datos cuando consida con el id del producto
        data.producto.forEach((prodcutobasededatos) =>{
            if(prodcutobasededatos.id === productocarrito.id){
                productocarrito.precio = prodcutobasededatos.precio;

                total += prodcutobasededatos.precio * productocarrito.cantida;
            }

        });

        let thumbsrc = producto.querySelectorAll('.producto__thumb-img')[0].src; //creamos variable cambiante para la ruta depnediendo del color
        if(productocarrito.color === 'rojo'){
            thumbsrc = './img/thumbs/rojo.jpg';
        }else if (productocarrito.color === 'amarillo'){
            thumbsrc = './img/thumbs/amarillo.jpg';
        }
        // creamos la plantilla HTML
        const plantillaprodcuto = `
        <div class="carrito__producto-info">
								<img src="${thumbsrc}" alt="" class="carrito__thumb" />
								<div>
									<p class="carrito__producto-nombre">
										<span class="carrito__producto-cantidad">${productocarrito.cantida} x </span>${productocarrito.nombre}
									</p>
									<p class="carrito__producto-propiedades">
										Tamaño:<span>${productocarrito.tamano}</span> Color:<span>${productocarrito.color}</span>
									</p>
								</div>
							</div>
							<div class="carrito__producto-contenedor-precio">
								<button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path
											d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
										/>
									</svg>
								</button>
								<p class="carrito__producto-precio">${formatearmoneda.format(productocarrito.precio * productocarrito.cantida)   } </p>
							</div>
        `;
        const itemcarrito = document.createElement('div');

        itemcarrito.classList.add('carrito__preducto');
        itemcarrito.innerHTML = plantillaprodcuto;

        ventanacarrito.querySelector('.carrito__body').appendChild(itemcarrito);


    });

    }
    ventanacarrito.querySelector('.carrito__total').innerText = formatearmoneda.format(total);

    };

//abrir carrito
botonesabrircarrito.forEach((botones) =>{
    botones.addEventListener('click',(e) =>{
        rendercarrito();
    });
});

//cerrar carrito
botonescerrarcarrito.forEach((botones) =>{
    botones.addEventListener('click',(e) =>{
        ventanacarrito.classList.remove('carrito--active');  //entramos dentro de ventanacarrito y borramos su classlist 
    });
});
//boton agregar carrito
botonagregarcarrito.addEventListener('click',(e) => {
    //todas la caracteristicas en su variable
    const id = producto.dataset.productoId;
    const nombre = producto.querySelector('.producto__nombre').innerText;
    const cantida = parseInt(producto.querySelector('#cantidad').value);
    const color = producto.querySelector('#propiedad-color input:checked').value;
    const tamano = producto.querySelector('#propiedad-tamaño input:checked').value;

    //agrupamos los elemnetos iguales dentro del carrito y que se sumen 

    if (carrito.length > 0){
        let  productoencarrito = false;

        carrito.forEach((item) => {
            if(item.id == id && item.nombre === nombre && item.color === color && item.tamano === tamano){
                item.cantida += cantida;
                productoencarrito = true;

            }
        });
 //usamos push para meterlo en el arreglo con sus caracteristicas
        if(!productoencarrito){
            carrito.push({
                id: id,
                nombre: nombre,
                color: color,
                tamano: tamano,
                cantida: cantida,
        
            });
    

        }
    }else {
        carrito.push({
            id: id,
            nombre: nombre,
            color: color,
            tamano: tamano,
            cantida: cantida,
    
        });

    }

    let thumbsrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
    if(color === 'rojo'){
        thumbsrc = './img/thumbs/rojo.jpg';
        
    }else if (color === 'amarillo'){
        thumbsrc = './img/thumbs/amarillo.jpg';
    }
    notificacion.querySelector('img').src = thumbsrc;
    notificacion.classList.add('notificacion--active');

    setTimeout(() => {notificacion.classList.remove('notificacion--active');},3000);

   
 
});

//botones para eliminar productos del carrito
ventanacarrito.addEventListener('click',(e)=>{
    if(e.target.closest('button')?.dataset.accion == 'eliminar-item-carrito'){
        const producto = e.target.closest('.carrito__preducto');
        const indexprodcuto = [...ventanacarrito.querySelectorAll('.carrito__preducto')].indexOf(producto);

//sobre escribimos carrito la ligica es... si el index no es igual, entra asi discriminamos el index del click 
        carrito = carrito.filter((item,index) => {
            if(index !== indexprodcuto){
                return item;

            }
        });

        rendercarrito();
    }
});

ventanacarrito.querySelector('#carrito__btn-comprar').addEventListener('click',(e) =>{
    console.log('enviando peticon de compra');

    //aqui se enviaria a la base de datos
});

class tabs {
    constructor (idelemneto){
        this.tabs = document.getElementById(idelemneto);
        this.nav = this.tabs.querySelector('.tabs');
        this.nav.addEventListener('click' , (e) => {
            if([...e.target.classList].includes('tabs__button')){
                //obtenemos el tab que queremos mostrar
                const tab = e.target.dataset.tab;

                //quitamos la clase--avtive de las tabs que no estan escojidas
                if(this.tabs.querySelector('.tab--active')){
                this.tabs.querySelector('.tab--active').classList.remove('tab--active');
                } 
                //quitamos la clase avtive de los botones que no estan elegidos
                if(this.tabs.querySelector('.tabs__button--active')){
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                    } 

                //agregamos la clase active al tab 
                this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

                


                //agregamos la clase active al boton
                e.target.classList.add('tabs__button--active');

            }

        });
    }
}

new tabs('mas-informacion');
