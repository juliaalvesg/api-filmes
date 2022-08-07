const button = document.getElementById('btn_generate');
const main_div = document.getElementById('container')
const table = document.getElementById('notas')

button.addEventListener('click', getRandom);

const lista = [];

function getRandom(){
    var idx = getRandomArbitrary(2,10000);
    const filme = fetch(`https://api.themoviedb.org/3/movie/${idx}?api_key=3530feee5bc0a726d4f0a1f7a815cc8d`).then(res=>{
        console.log(res);
        res.json().then(dados =>{
            console.log(dados);
            if(dados.status_code == '34'){
                getRandom();
            }
            else{
                main_div.innerHTML = '';

                titulo = dados.title;
                desc = dados.overview;
                id = dados.id;
                poster = dados.poster_path;

                div = document.createElement('div');
                div2 = document.createElement('div');
                title = document.createElement('h2');
                overview = document.createElement('h3');
                image = document.createElement('img');
                nota = document.createElement('input');
                avaliacao = document.createElement('input');
                salvar = document.createElement('button');

                salvar.addEventListener("click", getList)


                image.setAttribute("src", `https://image.tmdb.org/t/p/original${poster}`);
                div.classList.add('container');
                image.classList.add('imagem');
                title.classList.add('titulo')
                salvar.classList.add('btn');
                overview.classList.add('overview')
                salvar.classList.add('btn-outline-success','btn-salvar');
                title.innerText = titulo;
                overview.innerText = desc;
                nota.setAttribute("type", 'number');
                nota.setAttribute("min", 0);
                nota.setAttribute('max', 5);
                nota.setAttribute('placeholder', "Adicione sua nota de 0 a 5");
                nota.classList.add('nota','form-control');
                avaliacao.setAttribute('placeholder', "Adicione seu comentário");
                avaliacao.setAttribute("type", 'text');
                avaliacao.classList.add('avaliacao','form-control');
                salvar.innerText = "Salvar avaliação"

                div2.appendChild(image);
                div.appendChild(title);
                div.appendChild(overview);
                main_div.appendChild(div2);
                main_div.appendChild(div);
                main_div.appendChild(nota);
                main_div.appendChild(avaliacao);
                main_div.appendChild(salvar);
            }
        });

        }).catch(erro =>{
            console.log(erro+ " erro na requisição");
        });
}

function getList(title, nota, avaliacao){
    var item = []
    var titulo = document.querySelector('.titulo').innerText;
    var nota = document.querySelector('.nota').value;
    var avaliacao = document.querySelector('.avaliacao').value;

    document.querySelector('.nota').value = '';
    document.querySelector('.avaliacao').value = '';

    item.push(titulo);
    item.push(nota);
    item.push(avaliacao);

    lista.push(item);

    loadList();

}

function loadList(){
    table.innerHTML = '';
    ul = document.createElement('ul');
    lista.map(aval =>{
        li = document.createElement('li');
        editar = document.createElement('button');
        li.classList.add('list-group-item');
        editar.classList.add('btn');
        editar.classList.add('btn-warning');
        li.addEventListener('dblclick', deleteItem);
        li.addEventListener('click', editItem);
        editar.addEventListener('click', saveEdit);
        li.setAttribute('id', `${lista.indexOf(aval)}`);
        li.innerText = `${aval[0]} | Nota: ${aval[1]} | Review: ${aval[2]} | Salvar edição:  `;
        li.appendChild(editar)
        editar.setAttribute('id', `${lista.indexOf(aval)}`)
        ul.appendChild(li);
    })

    table.appendChild(ul);
}

function deleteItem(){
    id = this.id;
    lista.splice(id, 1);
    loadList();
}

function editItem(){
    id = this.id;
    document.querySelector('.nota').value = lista[id][1];
    document.querySelector('.avaliacao').value = lista[id][2];
}

function saveEdit(){
    id = this.id;
    lista[id][1] = document.querySelector('.nota').value;
    lista[id][2] = document.querySelector('.avaliacao').value;
    loadList();
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
