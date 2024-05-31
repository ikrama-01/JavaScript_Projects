const question = [
    {
        'que': 'which of the folowing is a markup language',
        'a': 'HTML',
        'b': 'CSS',
        'c': 'JavaScript',
        'd': 'Bootstrap',
        'correct': 'a'
    },
    {
        'que': 'what year was javascript launched',
        'a': '1996',
        'b': '1995',
        'c': '1994',
        'd': '1735',
        'correct': 'b'
    },
    {
        'que': 'which of the folowing is a styling framework ',
        'a': 'HTML',
        'b': 'CSS',
        'c': 'JavaScript',
        'd': 'Bootstrap',
        'correct': 'd'
    },
    {
        'que': 'which of the folowing is a styling language',
        'a': 'HTML',
        'b': 'CSS',
        'c': 'JavaScript',
        'd': 'Bootstrap',
        'correct': 'b'
    }
]

let index = 0;
let total = question.length;
let right = 0, wrong = 0;

const quebox = document.getElementById("questionBox");
const optInputs = document.querySelectorAll('.option');
const loadQuestion = () => {
    if(index == total){
        return endQuiz();
    }
    reset();
    const data = question[index];
    console.log(data);
    quebox.innerText = ` ${index + 1}) ${data.que}`;
    optInputs[0].nextElementSibling.innerText = data.a;
    optInputs[1].nextElementSibling.innerText = data.b;
    optInputs[2].nextElementSibling.innerText = data.c;
    optInputs[3].nextElementSibling.innerText = data.d;
}

const submitQuiz = () => {
    const data = question[index];
    const ans = getAns();
    if (ans === data.correct) {
        right++;
    } else{
        wrong++;
    }
    index++;
    loadQuestion();
    return;
}

const getAns = () => {
    let ans;
    optInputs.forEach(
        (input) => {
            if (input.checked) {
                ans = input.value;
            }
        }
    )
    return ans;
}

const reset = () => {
    optInputs.forEach(
        (input) => {
            input.checked = false;
        }
    )

}

const endQuiz = () => {
    document.getElementById("container").innerHTML = `
    <div style="text-align:center" >
    <h3>Thank you for playing the quiz :)</h3>
    <h2> ${right} / ${total} are correct </h2>
    <div/>`;
}

loadQuestion();