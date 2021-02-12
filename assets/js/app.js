// Initialize button events
document.getElementById('btn-start').onclick = function() 
{
    SubjectManager.page == "subject"; 
    SubjectManager.UpdateButtons();
}
document.querySelectorAll('.btn-prev').forEach(btnPrev => { btnPrev.onclick = function(){SubjectManager.PrevSubject()}; });
document.querySelectorAll('.btn-next').forEach(btnNext => { btnNext.onclick = function(){SubjectManager.NextSubject()}; });

// Initalize the subject Manager
SubjectManager.Initialize();