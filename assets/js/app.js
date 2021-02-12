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
    switch(btnNext.id)
    {
        case "btn-pro":
            btnNext.onclick = function(){SubjectManager.NextSubject(); answers.AddAnswer("pro"); };
        break;
        case "btn-none":
            btnNext.onclick = function(){SubjectManager.NextSubject(); answers.AddAnswer("none"); };
        break;
        case "btn-contra":
            btnNext.onclick = function(){SubjectManager.NextSubject(); answers.AddAnswer("contra"); };
        break;
        default:
            btnNext.onclick = function(){SubjectManager.NextSubject()};
        break;
    }
});

// Initalize the subject Manager
SubjectManager.Initialize();