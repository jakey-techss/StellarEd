class Resource{
    constructor(title, type, link){
        this.title = title
        this.type = type
        this.link = link
    }
}

const resources = [
  new Resource('Khan Academy', 'Link', 'https://www.khanacademy.org'),
  new Resource('Coursera', 'Link', 'https://www.coursera.org'),
  new Resource('Google Scholar', 'Link', 'https://scholar.google.com'),
  new Resource('Purdue OWL', 'Link', 'https://owl.purdue.edu'),
  new Resource('Wolfram Alpha', 'Link', 'https://www.wolframalpha.com'),
  new Resource('Grammarly', 'Link', 'https://www.grammarly.com'),
  new Resource('Quizlet', 'Link', 'https://www.quizlet.com'),
  new Resource('MIT OpenCourseWare', 'Link', 'https://ocw.mit.edu'),
  new Resource('Desmos', 'Link', 'https://www.desmos.com'),
  new Resource('Project MUSE', 'Link', 'https://muse.jhu.edu'),
  new Resource('edX', 'Link', 'https://www.edx.org'),
  new Resource('Codecademy', 'Link', 'https://www.codecademy.com'),
  new Resource('Duolingo', 'Link', 'https://www.duolingo.com'),
  new Resource('TED-Ed', 'Link', 'https://ed.ted.com'),
  new Resource('CrashCourse', 'Link', 'https://www.youtube.com/@crashcourse'),
  new Resource('JSTOR', 'Link', 'https://www.jstor.org'),
  new Resource('Library of Congress', 'Link', 'https://www.loc.gov'),
  new Resource('NASA STEM', 'Link', 'https://www.nasa.gov/stem'),
  new Resource('Britannica', 'Link', 'https://www.britannica.com'),
  new Resource('SparkNotes', 'Link', 'https://www.sparknotes.com'),
  new Resource('LitCharts', 'Link', 'https://www.litcharts.com'),
  new Resource('Project Gutenberg', 'Link', 'https://www.gutenberg.org'),
  new Resource('Internet Archive', 'Link', 'https://archive.org'),
  new Resource('OpenStax', 'Link', 'https://openstax.org'),
  new Resource('PhET Interactive Simulations', 'Link', 'https://phet.colorado.edu'),
  new Resource('PubChem', 'Link', 'https://pubchem.ncbi.nlm.nih.gov'),
  new Resource('ArXiv', 'Link', 'https://arxiv.org'),
  new Resource('SSRN', 'Link', 'https://www.ssrn.com'),
  new Resource('Zotero', 'Link', 'https://www.zotero.org'),
  new Resource('EasyBib', 'Link', 'https://www.easybib.com'),
  new Resource('Merriam-Webster', 'Link', 'https://www.merriam-webster.com'),
  new Resource('Thesaurus.com', 'Link', 'https://www.thesaurus.com'),
  new Resource('Poetry Foundation', 'Link', 'https://www.poetryfoundation.org'),
  new Resource('No Fear Shakespeare', 'Link', 'https://www.sparknotes.com/shakespeare'),
  new Resource('Hemingway Editor', 'Link', 'https://www.hemingwayapp.com'),
  new Resource('Overleaf', 'Link', 'https://www.overleaf.com'),
  new Resource('AnkiWeb', 'Link', 'https://ankiweb.net'),
  new Resource('Chegg', 'Link', 'https://www.chegg.com'),
  new Resource('Socratic by Google', 'Link', 'https://socratic.org'),
  new Resource('Photomath', 'Link', 'https://www.photomath.com'),
  new Resource('GeoGebra', 'Link', 'https://www.geogebra.org'),
  new Resource('Paul\'s Online Math Notes', 'Link', 'https://tutorial.math.lamar.edu'),
  new Resource('College Board', 'Link', 'https://www.collegeboard.org'),
  new Resource('ACT.org', 'Link', 'https://www.act.org'),
  new Resource('Khan Academy SAT Prep', 'Link', 'https://www.khanacademy.org/sat'),
  new Resource('The Princeton Review', 'Link', 'https://www.princetonreview.com'),
  new Resource('Common App', 'Link', 'https://www.commonapp.org'),
  new Resource('Federal Student Aid', 'Link', 'https://studentaid.gov'),
  new Resource('Fastweb', 'Link', 'https://www.fastweb.com'),
  new Resource('Scholarships.com', 'Link', 'https://www.scholarships.com'),
  new Resource('BigFuture', 'Link', 'https://bigfuture.collegeboard.org'),
  new Resource('W3Schools', 'Link', 'https://www.w3schools.com'),
  new Resource('MDN Web Docs', 'Link', 'https://developer.mozilla.org'),
  new Resource('GitHub Education', 'Link', 'https://education.github.com'),
  new Resource('Replit', 'Link', 'https://replit.com'),
  new Resource('Stack Overflow', 'Link', 'https://stackoverflow.com'),
  new Resource('Newsela', 'Link', 'https://newsela.com'),
  new Resource('No Red Ink', 'Link', 'https://www.noredink.com'),
  new Resource('Canva for Education', 'Link', 'https://www.canva.com/education'),
  new Resource('Google Docs', 'Link', 'https://docs.google.com'),
  new Resource('Notion', 'Link', 'https://www.notion.so'),
  new Resource('MindMeister', 'Link', 'https://www.mindmeister.com'),
  new Resource('StudyStack', 'Link', 'https://www.studystack.com'),
  new Resource('Niche', 'Link', 'https://www.niche.com'),
  new Resource('PubMed', 'Link', 'https://pubmed.ncbi.nlm.nih.gov'),
  new Resource('Study Skills Handbook', 'File', 'https://library.wwu.edu/files/2022-06/TCStudySkillsBooklet.pdf'),
  new Resource('APA 7th Edition Quick Guide', 'File', 'https://www.ohsu.edu/sites/default/files/2021-08/APA%207th%20edition%20Quick%20Guide%20updated.pdf'),
  new Resource('APA 7th Edition Style Guide', 'File', 'https://www.isu.edu/media/libraries/student-success/tutoring/handouts-writing/using-sources/APA7-Style.pdf'),
  new Resource('APA 7th Edition Guide (Bowie State)', 'File', 'https://bowiestate.edu/academics/colleges/college-of-arts-and-sciences/departments/language-literature-and-cultural-studies/writing-center/files/apa7theditionquickguide.pdf'),
  new Resource('APA Quick Style Sheet (Lane CC)', 'File', 'https://library.lanecc.edu/sites/default/files/handouts/apa_quick.pdf'),
  new Resource('MLA Citation Quick Reference', 'File', 'https://www.berkshirecc.edu/academics/academic-support/writing-center/resources/mla_citation_quick_reference.pdf'),
  new Resource('MLA Quick Reference Guide (JCCC)', 'File', 'https://www.jccc.edu/student-resources/academic-resource-center/writing-center/files/mla-quick-reference-guide-av.pdf'),
  new Resource('Algebra Cheat Sheet', 'File', 'https://tutorial.math.lamar.edu/pdf/algebra_cheat_sheet.pdf'),
  new Resource('Calculus Cheat Sheet', 'File', 'https://tutorial.math.lamar.edu/pdf/calculus_cheat_sheet_all.pdf'),
  new Resource('Algebra and Trig Formula Sheet', 'File', 'https://www.tamucc.edu/academics/casa/assets/documents/algebra-and-trig-formula-sheet.pdf'),
  new Resource('Pre-Calculus Reference Sheet', 'File', 'https://www.csueastbay.edu/stemlab/files/docs/pre-calculus-reference-sheet.pdf'),
  new Resource('Cornell Note Taking System Guide', 'File', 'https://lsc.cornell.edu/wp-content/uploads/2015/10/Cornell-Note_Taking-System.pdf'),
  new Resource('Cornell Notes Template', 'File', 'https://academicaffairs.du.edu/sites/default/files/2022-03/cornell_notes_template.pdf'),
  new Resource('Cornell Note Taking (USU)', 'File', 'https://www.usu.edu/academic-support/files/note_taking_cornell.pdf'),
  new Resource('Essay Outline Template', 'File', 'https://sjsu.edu/writingcenter/docs/handouts/Outline%20Template.pdf'),
  new Resource('Argument Essay Outline', 'File', 'https://www.hancockcollege.edu/writing/documents/Argument%20Outline%20Format%20-%20Fillable.pdf'),
  new Resource('Compare and Contrast Essay Outline', 'File', 'https://www.hancockcollege.edu/writing/documents/Compare%20and%20Contrast%20Essay%20Outline%20-%20Fillable.pdf'),
  new Resource('Basic Academic Outline', 'File', 'https://academics.umw.edu/writing-fredericksburg/files/2011/09/Basic-Outlines.pdf'),
  new Resource('Essay Outline Practice Worksheet', 'File', 'https://www.suno.edu/assets/suno/PDFs/WritingCenter/Academic-Essay-Outline-Practice-Worksheet.pdf'),
  new Resource('Lab Report Format Guide', 'File', 'https://ocw.mit.edu/courses/5-310-laboratory-chemistry-fall-2019/1dfcf5c51821a7a6949f7745a199c063_MIT5_310F19_report.pdf'),
  new Resource('Sample Biology Lab Report', 'File', 'https://www.hamilton.edu/documents/Sample%20Bio%20Lab%20Report.pdf'),
  new Resource('Lab Report Format (UTRGV)', 'File', 'https://faculty.utrgv.edu/jose.j.sanchez01/MECE3115/3115LabReportFormat.pdf'),
  new Resource('Research Paper Rubric (Marshall)', 'File', 'https://www.marshall.edu/fys/files/Research_Paper_Grading_Rubric.pdf'),
  new Resource('Research Paper Rubric (K-State)', 'File', 'https://www.k-state.edu/assessment/toolkit/measurement/resrubric.pdf'),
  new Resource('Term Paper Rubric (Stetson)', 'File', 'https://www.stetson.edu/other/writing-program/media/rubrictermpaper.pdf'),
  new Resource('Rubric Examples Collection', 'File', 'https://www.csu.edu/ctre/pdf/rubricexamples-all.pdf'),
  new Resource('Study Skills Tip Sheet', 'File', 'https://www.honolulu.hawaii.edu/downloads/web/student-services/care-resource-study-skills.pdf'),
  new Resource('Online Learning Study Skills Guide', 'File', 'https://content.dodea.edu/vs/hs/orientation/docs/study_skills.pdf'),
  new Resource('Improve High School Study Skills', 'File', 'https://www.jmu.edu/valleyscholars/files/improvemyhighschoolstudyskills.pdf'),
  new Resource('College Application Worksheet (CSU)', 'File', 'https://www.calstate.edu/apply/freshman/documents/application-checklist-freshman.pdf'),
  new Resource('College Application Worksheet (ACE)', 'File', 'https://www.acenet.edu/Documents/College%20Application%20Worksheet%20final.pdf'),
  new Resource('Admissions Checklist (Blinn College)', 'File', 'https://www.blinn.edu/admissions/pdf/admissions-checklist.pdf'),
  new Resource('Applying to College 101 Workbook', 'File', 'https://admissions.upenn.edu/sites/default/files/2024-06/Applying%20to%20College%20101%20Workbook.pdf'),
  new Resource('FAFSA Process Overview', 'File', 'https://studentaid.gov/sites/default/files/fafsa-process.pdf'),
  new Resource('Lonestar Rubric Samples', 'File', 'https://www.lonestar.edu/documents/15-Samples_of_Rubrics.pdf')
];

resources.forEach((r)=>{
    if(r.type == "Link"){
        let LinkBox = document.getElementById("link");
        let Link = document.createElement('div')
        Link.classList.add("Link")
        Link.innerHTML = `<a href=${r.link}><div class="ClassifierImageLink"><img src="assets/url-1423-svgrepo-com.png"></div>
                <p>${r.title}</p></a>`
        LinkBox.appendChild(Link)
    }else{
        let DocBox = document.getElementById("doc");
        let Doc = document.createElement('div')
        Doc.classList.add("Shopitem")
        Doc.innerHTML = `<div class="verified"><img></div>
                <div class="ClassifierImage"><img src="https://www.svgrepo.com/show/527687/document-add.svg"></div>
                <p>${r.title}</p>
                <div class="downloadButton">
                    <a href=${r.link} download=${r.title}><button><span class="material-icons">download</span></button></a>
                </div>`
        DocBox.appendChild(Doc)
    }
})
