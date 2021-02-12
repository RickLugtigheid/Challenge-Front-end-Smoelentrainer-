// Check if we have a valid json data object for the subjects
if(typeof subjects != "object") throw new Error("No subjects found! \n   Load the subjects data with this link: http://stemwijzer.dvc-icta.nl/data.js");


/**
 * A static class that handles the loading of subjects
 */
class SubjectManager
{
    constructor()
    {
        // We want to use this a static class
        // In js we have no static class so we just throw an error when constructing the class
        throw new SyntaxError("Can't create a instance of a static class!");
    }

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
     * @type {"start" | "subject" | "end"}
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
        subject['parties'].forEach(party => {
            console.log(party);
        }); 

        // True when the subject was successfully loaded
        return true;
    }

    /**
     * Updates the visibility state of the next and prev buttons
     */
    static UpdateButtons()
    {
        // When we are of the end page and we want to go back we load the subject page
        if(this.page == "end") 
        {                
            document.getElementById("end-page").style = 'display: none;';
            document.getElementById("subject-page").style = 'display: block;';

            this.page = "subject";
        }
        else if(this.page == "start")
        {
            document.getElementById("start-page").style = 'display: none;';
            document.getElementById("end-page").style = 'display: none;';
            document.getElementById("subject-page").style = 'display: block;';

            this.page = "subject";
        }

        // Get the buttons
        let btnsNext = document.querySelectorAll('.btn-next');
        let btnPrev = document.getElementById('btn-prev');

        // Check which button/buttons should be shown

        if(this.subjectPointer >= subjects.length) 
        {
            btnsNext.forEach(btnNext => { btnNext.style = "visibility: hidden;"; });

            // Load the end page
            if(this.page == "subject") 
            {                
                document.getElementById("end-page").style = 'display: block;';
                document.getElementById("subject-page").style = 'display: none;';

                this.page = "end";
            }
        }
        else btnsNext.forEach(btnNext => { btnNext.style ="visibility: visible;"; });

        // When we are at 0 or lower we won't show the prev button
        if(this.subjectPointer <= 0) btnPrev.style = "visibility: hidden;"
        else btnPrev.style = "visibility: visible;"
    }
}

class 