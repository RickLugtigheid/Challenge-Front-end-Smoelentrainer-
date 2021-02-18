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
    document.getElementById('result').innerHTML = 'Beste Match: ' + SubjectManager.GetResult()['party'];
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

/**
 * Creates an element from a string. Like: '<p>InnerHTML</p>'
 * @param {string} string String to create an element from
 * @returns {HTMLElement} The element created from the input string
 */
function CreateElementFromString(string) 
{
    // Create an template element and give it the string as inner html
    let template = document.createElement('template');
    template.innerHTML = string;
    
    // Return the first child (the element)
    return template.content.firstChild;
}
/**
 * Converts a string to a hex color
 * @param {string} string input string
 * @returns Color in hex
 */
function StringToColor(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}
/**
 * 
 * @param {string} hexColor Hex to add alpha to
 * @param {number} alpha Ammout of alpha to add [0 to 1]
 * @returns Hex alpha
 */
function HexAddAlpha(hexColor, alpha) {
    // Generate the opacity
    let opacity = Math.round(Math.min(Math.max(alpha || 1, 0), 1) * 255);
    // Add the opacity to the hex color
    return hexColor + opacity.toString(16).toUpperCase();
}