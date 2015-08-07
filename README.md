### Introduction
This repository is used for Dartmouth Learning Network's [Moving On Up](http://dlnmovingonup.ca) platform.

This is a mostly static website built and styled with [Bootstrap](http://getbootstrap.com).

The course content is built using Articulate Storyline and put into the above locations. For more details on building course content, talk to [Marcia Franklin](http://github.com/marciafranklin).

### Naming conventions

Course content is stored under `/courses/`, broken down by **subject** (e.g. `math`, `english`), and further by **topic** (e.g. `fractions`).

Under the **topic** directory, the content for an individual course resides in a directory whose name relates to the course content, e.g. `fraction_sense_and_area_models`. Thus, you can find the course content for the [Fraction Sense & Area Models]() course under `/courses/math/fractions/fraction_sense_and_area_models/`.

### Adding a new course

When adding a new course, or updating an existing one, note the following:
* You will probably need to add the course to the main menu in `header.html`. It should be fairly easy to follow how this has been done for existing courses.
* You should provide an image that is a screenshot of the course - probably of the Learning Objectives page of the course.
 * These images reside in `/assets/course_images/` and follow a naming convention, based on the naming of the course (see **Naming conventions**, above). This naming convention should include the **subject**, the **topic**, the course title and the name "title_screen.png", all concatenated and separated by underscores ("_"). So, for the example of **Fraction Sense & Area Models**, this screenshot/preview image will reside at `/assets/course_images/math_fractions_fraction_sense_and_area_models_title_screen.png`
