

$(function() {
    inicializa();
});

function inicializa()
{
    //alert('ok');
    IniciaDrag();
    IniciaDrop()
}

function IniciaDrag()
{
    $(".draggable").draggable({
        rever: "invalid",
        stack: $(".draggable"),
        helper: "clone",
        cursor: "move",
        addClasses :"false",
        start: function(event, ui) {
            return DragPermitido($(event.target).parent(),event.target);
        }
    });
}
function IniciaDrop()
{
    $(".droppable").droppable({
        accept: ".draggable",
        drop : function(event,ui) {
            var pilar_alvo = $(this).find(".contentor");
            if(MovimentoValido(pilar_alvo,ui.draggable))
            {
                $(ui.draggable).prependTo(pilar_alvo);
            }
            else
            {
                $("#msg").text("Nao pode fazer esse movimento");
            }

            if(JogoAcabou(event.target))
            {
                $("#msg").text("Parabéns");
            }
        }
    });
}

/*verificar se é o primeiro disco da pilha */ 
function DragPermitido(pai,filho)
{   
    return $(pai).children()[0].id == filho.id;
}
function MovimentoValido(pai,filho)
{
    var filhos = $(pai).children();
    return (filhos.length == 0) || (filhos.css("width") >= filho.css("width"));
}
function JogoAcabou(pai)
{
    return ((pai.id == "Pilar3") && ($(pai).find(".contentor").children().length == 3));
}