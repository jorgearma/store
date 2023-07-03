export default class tabs {
    constructor (idelemneto){
        this.tabs = document.getElementById(idelemneto)
        this.nav = this.tabs.querySelector('.tabs');
        this.nav.addEventListener('click' , (e) => {
            if([...e.target.classList].includes('tabs__button')){
                //obtenemos el tab que queremos mostrar
                const tab = e.target.dataset.tab;

                //quitamos la clase--avtive de las tabs que no estan escojidas
                if(this.tabs.querySelector('.tab--active')){
                this.tabs.querySelector('.tab--active').classList.remove('tab--active')
                } 
                //quitamos la clase avtive de los botones que no estan elegidos
                if(this.tabs.querySelector('.tabs__button--active')){
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active')
                    } 

                //agregamos la clase active al tab 
                this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

                


                //agregamos la clase active al boton
                e.target.classList.add('tabs__button--active')

            }

        })
    }
}
