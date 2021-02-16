var answers = new AnswerArray();

// Initialize button events
document.getElementById('btn-start').onclick = function() 
{
    SubjectManager.page == "subject"; 
    SubjectManager.UpdateButtons();
}
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
    // Set out page to result
    SubjectManager.page = 'result';

    // Show only the result page
    document.getElementById('end-page').style = 'display: none;';
    document.getElementById('subject-page').style = 'display: none;';
    document.getElementById('result-page').style = 'display: block;';

    // Get the result and put it in the result element
    document.getElementById('result').innerHTML = SubjectManager.GetResult()['party'];
};

// Initalize the subject Manager
SubjectManager.Initialize();