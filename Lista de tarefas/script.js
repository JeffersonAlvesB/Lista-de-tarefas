const ButtonAdicionar = document.querySelector(".button_add");
const ContainerTarefa = document.querySelector(".container_lista_ul");

//Funções

function AdicionarTarefa() {
  const InputTarefa = document.querySelector(".ipt_add").value;

  if (InputTarefa === "") return;

  //Criando tarefa
  const CriarLista = document.createElement("li");
  CriarLista.classList.add("list_li");

  const CriarCheck = document.createElement("input");
  CriarCheck.classList.add("check");
  CriarCheck.type = "checkbox";

  const CriarTarefa = document.createElement("p");
  CriarTarefa.classList.add("tarefa");
  CriarTarefa.innerHTML += InputTarefa;

  const CriarButtonDelete = document.createElement("button");
  CriarButtonDelete.classList.add("delete");

  const CriarDelete = document.createElement("i");
  CriarDelete.classList.add("bi-x");

  CriarButtonDelete.appendChild(CriarDelete);

  CriarLista.appendChild(CriarCheck);
  CriarLista.appendChild(CriarTarefa);
  CriarLista.appendChild(CriarButtonDelete);

  //eventos Da tarefa

  CriarCheck.addEventListener("change", () => {
    BoxAtiva.call(CriarCheck);
    SalvarTarefas();
  });

  CriarButtonDelete.addEventListener("click", () => {
    DeletarTarefa.call(CriarButtonDelete);
    SalvarTarefas();
  });

  ContainerTarefa.appendChild(CriarLista);
  SalvarTarefas();
}

function BoxAtiva() {
  const Check = this;
  const Tarefa = Check.nextElementSibling;
  if (Check.checked) {
    Tarefa.classList.add("riscado");
  } else {
    Tarefa.classList.remove("riscado");
  }
}

function DeletarTarefa() {
  const Tarefa = this.parentElement;
  Tarefa.remove();
}

//localStorage
function SalvarTarefas() {
  const tarefas = [];
  document.querySelectorAll(".list_li").forEach((tarefa) => {
    tarefas.push({
      texto: tarefa.querySelector(".tarefa").innerText,
      riscado: tarefa.querySelector(".check").checked,
    });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function CarregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas"));
  if (tarefas) {
    tarefas.forEach((tarefa) => {
      const CriarLista = document.createElement("li");
      CriarLista.classList.add("list_li");

      const CriarCheck = document.createElement("input");
      CriarCheck.classList.add("check");
      CriarCheck.type = "checkbox";
      CriarCheck.checked = tarefa.riscado;

      const CriarTarefa = document.createElement("p");
      CriarTarefa.classList.add("tarefa");
      CriarTarefa.innerHTML += tarefa.texto;
      if (tarefa.riscado) {
        CriarTarefa.classList.add("riscado");
      }

      const CriarButtonDelete = document.createElement("button");
      CriarButtonDelete.classList.add("delete");

      const CriarDelete = document.createElement("i");
      CriarDelete.classList.add("bi-x");

      CriarButtonDelete.appendChild(CriarDelete);

      CriarLista.appendChild(CriarCheck);
      CriarLista.appendChild(CriarTarefa);
      CriarLista.appendChild(CriarButtonDelete);

      //eventos da tarefa

      CriarCheck.addEventListener("change", () => {
        BoxAtiva.call(CriarCheck);
        SalvarTarefas();
      });

      CriarButtonDelete.addEventListener("click", () => {
        DeletarTarefa.call(CriarButtonDelete);
        SalvarTarefas();
      });

      ContainerTarefa.appendChild(CriarLista);
    });
  }
}

//evento click
ButtonAdicionar.addEventListener("click", AdicionarTarefa);
//Função ao entrar
CarregarTarefas();
