var answers = new AnswerArray();

// Initialize button events
document.getElementById('btn-start').onclick = function() { SubjectManager.ShowPage('subject'); }
document.querySelectorAll('.btn-prev').forEach(btnPrev => { btnPrev.onclick = function(){SubjectManager.PrevSubject()}; });
document.querySelectorAll('.btn-next').forEach(btnNext => 
{ 
    // Add the correct event listners to the buttons
    switch(btnNext.id)
    {
        case "btn-pro":
            btnNext.onclick = function(){SubjectManager.NextSubject(); answers.SetAnswer("pro"); };
        break;
        case "btn-none":
            btnNext.onclick = function(){SubjectManager.NextSubject(); answers.SetAnswer("none"); };
        break;
        case "btn-contra":
            btnNext.onclick = function(){SubjectManager.NextSubject(); answers.SetAnswer("contra"); };
        break;
        default:
            btnNext.onclick = function(){SubjectManager.NextSubject()};
        break;
    }
});
document.getElementById('btn-result').onclick = function() 
{
    // Show the result page
    SubjectManager.ShowPage('result');

    // Get the result and put it in the result element
    document.getElementById('result').innerHTML = SubjectManager.GetResult()['party'];
};

// Load all subjects to the importent subject page
// Heavy because the subjects clicked weigh more
const HEAVY_SUBJECTS = document.getElementById('important-subjects');
for(let i = 0; i < subjects.length; i++)
{
    let subject = subjects[i];

    // Create a container for the button
    let container = document.createElement('div');

    // Create a new checkbox
    let checkbox = document.createElement('input');
    checkbox.id = 'subject-' + i;
    checkbox.className = 'form-check-input';
    checkbox.type = 'checkbox';

    // Create and label for the checkbox
    let checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = 'subject-' + i;
    checkboxLabel.className = 'form-check-label';
    checkboxLabel.innerHTML = subject['title'];

    // append to the elements
    container.appendChild(checkbox);
    container.appendChild(checkboxLabel);
    HEAVY_SUBJECTS.appendChild(container);
}

// Initalize the subject Manager
SubjectManager.Initialize();