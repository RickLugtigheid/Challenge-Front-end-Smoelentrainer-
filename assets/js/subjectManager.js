/**
 * A static class that handles the subjects
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
     * Points to the curent subject
     */
    static subjectPointer = 0;


    /**
     * Loads the next subject
     */
    static NextSubject() 
    {
        // Check if we have a valid data arrary for the subjects
        if(Array.isArray(subjects)) throw new Error("No subjects found! \n   Load the subjects data with this link: http://stemwijzer.dvc-icta.nl/data.js");
        
        // Increase the subjectPointer
        this.subjectPointer++;

        // Loads the curent subject
        this.LoadSubject();
    }

    /**
     * Loads the previous subject
     */
    static PrevSubject()
    {
        // Check if we have a valid data arrary for the subjects
        if(Array.isArray(subjects)) throw new Error("No subjects found! \n   Load the subjects data with this link: http://stemwijzer.dvc-icta.nl/data.js");
        
        // Decrease the subjectPointer
        this.subjectPointer--;

        // Loads the curent subject
        this.LoadSubject();
    }

    /**
     * Loads a subject from the subject array and loads it to the screen
     */
    static LoadSubject()
    {
        // Get the subject
        let subject = subjects[subjectPointer];

        // Check if we found a subject
        if(subject == null) throw new Error(`Subject with index '${this.subjectPointer}' was not found`);

        // Get the elements we want to insert the subject into
        document.getElementById('title').innerHTML = subject['title'];
        document.getElementById('statement').innerHTML = subject['statement'];
    }
}