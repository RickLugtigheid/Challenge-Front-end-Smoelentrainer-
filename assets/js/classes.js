// Check if we have a valid json data object for the subjects
if(typeof subjects != "object") throw new Error("No subjects found! \n   Load the subjects data with this link: http://stemwijzer.dvc-icta.nl/data.js");


/**
 * A static class that handles the loading of subjects
 * @static
 */
class SubjectManager
{
    /**
     * Initialize the Subject Manager
     */
    static Initialize()
    {
        // Load the first subject
        this.LoadSubject();
    }

    /**
     * Points to the curent subject
     * @type {number}
     */
    static subjectPointer = 0;
    
    /**
     * The curent local Page
     * @type {"start" | "subject" | "end" | "result"}
     */
    static page = "start";

    /**
     * Loads the next subject
     * @returns {boolean} If the next subject was found
     */
    static NextSubject() 
    {
        // Increase the subjectPointer
        this.subjectPointer++;

        // Loads the curent subject
        this.UpdateButtons();
        return this.LoadSubject();
    }

    /**
     * Loads the previous subject
     * @returns {boolean} If the previous subject was found
     */
    static PrevSubject()
    {
        // Decrease the subjectPointer
        this.subjectPointer--;

        // Loads the curent subject
        this.UpdateButtons();
        return this.LoadSubject();
    }

    /**
     * @returns {boolean} If subject was successfully loaded
     */
    static LoadSubject()
    {
        // Get the subject
        let subject = subjects[this.subjectPointer];

        // Check if we found a subject
        if(subject == null) return false;

        // Get the elements we want to insert the subject into
        document.getElementById('title').innerHTML = subject['title'];
        document.getElementById('statement').innerHTML = subject['statement'];

        // Load the opinions of the parties
        subject['parties'].forEach(party => 
        {
            // Create an text element to put the party opinion in
            let elementStr =  
            `<div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="${party['name']}-drop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${party['name']}
                </button>
                <div class="dropdown-menu" aria-labelledby="${party['name']}-drop">
                    <p>${party['opinion']}</p>
                </div>
            </div>`;

            // Append the element to the correct element
            document.getElementById('opinions-'  + party['position']).appendChild(CreateElementFromString(elementStr));
            console.warn(elementStr);
        });

        // True when the subject was successfully loaded
        return true;
    }
    /**
     * @returns {string} Result
     */
    static GetResult()
    {
        // Count all the parties where the result matches
        let partyCount = [];
        parties.forEach(party =>
        {
            partyCount.push({'party': party['name'], 'matches': 0});
        });

        // Create an array with the extra points per match
        let extraPoints = []
        for(let i = 0; i < HEAVY_SUBJECTS.children.length; i++)
        {
            // The first child is the checkbox
            // And the second the label
            let child = HEAVY_SUBJECTS.children[i];

            // Check if we want extra value
            if(child.children[0].checked) 
                // Add the subject we want extra points for to the array
                extraPoints.push(child.children[1].innerHTML);
        }

        // For all answes we add to 
        answers.inner.forEach(answer => {
            // Check the parties that match with this answer
            answer['matches'].forEach(match => 
            {
                console.log(match);
                // Check in all parties if there is a match
                partyCount.forEach(party => {
                    if(party['party'] == match['name'])
                    {
                        party['matches']++;
                        // Check if we should give extra points
                        if(extraPoints.includes(subjects[answer['subjectID'] - 1]['title'])) party['matches']++;
                    }
                });
            });
        });

        // Now we check who got the most matches and we return this result
        let bestMatch = {'party': 'empty', 'matches': -1};
        partyCount.forEach(party => 
        {
            if(party['matches'] > bestMatch['matches']) bestMatch = party;
        });

        // Create a pichart for the matches
        let chartData = {
            datasets: [{
                label: '# keer eens',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: []
        };

        partyCount.forEach(party => 
        {
            // Generate a color from string
            let color = StringToColor(party['party']);

            // Add to the data
            chartData['datasets'][0]['data'].push(party['matches']);
            chartData['datasets'][0]['backgroundColor'].push(HexAddAlpha(color, .25)); // Add transparency
            chartData['datasets'][0]['borderColor'].push(color);
            chartData['labels'].push(party['party']);
        });

        var ctx = document.getElementById('matchChart').getContext('2d');
        var matchesChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {}
        });
        
        return bestMatch;
    }
    /**
     * @param {"start" | "subject" | "end" | "result"} page
     */
    static ShowPage(page)
    {
        // Set the curent page
        this.page = page;

        // Show/hide the corect pages
        document.getElementById('start-page').style = this.page == 'start' ? 'display: block;' : 'display: none;';
        document.getElementById('subject-page').style = this.page == 'subject' ? 'display: block;' : 'display: none;';
        document.getElementById('end-page').style = this.page == 'end' ? 'display: block;' : 'display: none;';
        document.getElementById('result-page').style = this.page == 'result' ? 'display: block;' : 'display: none;';
    }

    /**
     * Updates the visibility state of the next and prev buttons
     */
    static UpdateButtons()
    {
        // Empty the party opinions
        document.getElementById('opinions-pro').innerHTML = '';
        document.getElementById('opinions-none').innerHTML = '';
        document.getElementById('opinions-contra').innerHTML = '';

        // Get the buttons
        let btnsNext = document.querySelectorAll('.btn-next');
        let btnsPrev = document.querySelectorAll('.btn-prev');

        // Check which button/buttons should be shown

        if(this.subjectPointer >= subjects.length) 
        {
            btnsNext.forEach(btnNext => { btnNext.style = "visibility: hidden;"; });

            // Load the end page
            if(this.page == "subject") 
            {
                // Show the end page
                this.ShowPage('end');

                // Export the data
                answers.Export();
            }
        }
        else btnsNext.forEach(btnNext => { btnNext.style ="visibility: visible;"; });

        // When we are at 0 or lower we won't show the prev button
        if(this.subjectPointer <= 0) btnsPrev.forEach(btnPrev => { btnPrev.style="visibility: hidden;"; });
        else btnsPrev.forEach(btnPrev => { btnPrev.style="visibility: visible;"; });
    }
}

class AnswerArray
{
    /**
     * Array of key value pairs 
     * @type {Array.<{subjectID: number, answer: string, matches: Array}>}
     */
    inner = [];

    /**
     * Adds/Sets an answer to the answer array
     * @param {"pro" | "contra" | "none"} answer 
     */
    SetAnswer(answer)
    {
        // Pointer to the curent element
        let curentPointer = SubjectManager.subjectPointer - 1;

        // Get all parties connected to the answer
        let partiesFound = [];
        subjects[curentPointer]['parties'].forEach(subject => 
        {
            if(subject['position'] == answer) partiesFound.push(subject);
        });

        // Set the answer with the curent subject id
        this.inner[curentPointer] = { subjectID: SubjectManager.subjectPointer, 'answer': answer, 'matches': partiesFound };
    }
    
    Export()
    {
        //location.replace(window.URL.createObjectURL(new Blob([this.inner], {type: 'application/json'})));
        // Get the source of the page
        
        let source = document.documentElement;
        document.getElementById('export').href = window.URL.createObjectURL(new Blob([source.innerHTML], {type: 'text/html'})); //'application/pdf'
    }
}