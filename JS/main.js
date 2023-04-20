const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);
    
    if(nome.value !== '' && quantidade.value !== ''){
        
        const itemAtual = {
            "nome": nome.value,
            "quantidade": quantidade.value
        }

        if (existe) {
            itemAtual.id = existe.id;
            
            atualizaElemento(itemAtual);
    
            itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;

        }else{

            itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
            
            criaElemento(itemAtual);

            itens.push(itemAtual);

        }


        localStorage.setItem("itens", JSON.stringify(itens));
        nome.value = "";
        quantidade.value = "";
    }
});

function criaElemento(item) {
    //cria o elemento li
    const novoItem = document.createElement("li");
    //adiciona a classe item
    novoItem.classList.add("item");

    //cria o elemento strong
    const numeroItem = document.createElement("strong");
    //a quantidade do item dentro do strong
    numeroItem.innerHTML = item.quantidade;
    //adiciona o id do item no data-id do strong
    numeroItem.dataset.id = item.id;

    //adiciona o strong dentro do li
    novoItem.appendChild(numeroItem);
    
    //adiciona o nome do item dentro do li
    novoItem.innerHTML += item.nome;

    //adiciona o botão de deletar dentro do li
    novoItem.appendChild(botaoDeleta(item.id));
    
    //adiciona o li dentro da ul
    lista.appendChild(novoItem);

}

function atualizaElemento(item){
    //atualiza a quantidade no html
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    //cria o botão
    const elementobotao = document.createElement("button");
    //estiliza o botão
    elementobotao.innerText = "X";
    //gera o evento de click
    elementobotao.addEventListener("click", function(){
        //chama a função que deleta o elemento
        deletaElemento(this.parentElement,id);
    })
    //retorna o botão
    return elementobotao;
}

function deletaElemento(item,id){
    //remove o item do html
    item.remove();
    //remove um item do array pelo id
    itens.splice(itens.findIndex(elemento => elemento.id === id),1);

    //rescreve o array no localstorage
    localStorage.setItem("itens", JSON.stringify(itens));
}