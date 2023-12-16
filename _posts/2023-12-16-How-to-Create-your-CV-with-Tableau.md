---
title: "How to create your CV with Tableau"
tags:
  - bi
toc: true
toc_sticky: true
header:
  og_image: /assets/images/post_images/6. tableau dashboard/my_cv_og.jpg
  #height: 1200
  #width: 630
  #Background color: #eeeeee
  #Text color: #222831
  #The recommended image ratio for an og:image is 1.91:1. The optimal size would be 1200 x 630.
excerpt: "In this post, we will explain how to create your CV with Tableau"
---

# Why
Using Tableau (and Tableau Public for uploading) to showcase your portfolio demonstrates your expertise in data visualization, storytelling, and analytics, which are essential skills for the role. Incorporating Tableau dashboards or visualizations into your CV showcases your technical proficiency in using this tool.
- It highlights your ability to create interactive visualizations, and derive insights, which can be very appealing to potential employers.Using Tableau to create your CV stands out among traditional CVs. 
- It can make your application memorable and unique, leaving a lasting impression on recruiters or hiring managers who are often inundated with conventional resumes.Tableau offers interactivity and engagement through its dashboards. 
- Incorporating interactive elements in your CV allows the recruiter to interact with your data visualizations, providing them with a more immersive experience, which can set you apart from other candidates.
- Your Tableau-based CV can serve as a portfolio demonstrating your previous projects, data visualization skills, and the impact you've made in your previous roles.
- Using Tableau for your CV demonstrates your fantasy and inclination toward innovation and staying updated with the latest trends in data visualization and analytics. 

While creating a CV with Tableau can be impressive, it's essential to ensure that the visualizations are **clear**, **easy to understand**, and **relevant** to the job you're applying for. Balance **creativity** with **readability** and **relevance** to make a compelling case for your candidacy as an analyst.<br>
{: .notice--info}

# How to create your CV with Tableau
Below I'll demonstrate **Step-by-step** the way I've created mine. Perhaps there's space for improvement. 

## Data sources
Tableau Public accepts only **extracts** as data source type (live or extract). 
- We have to create our personal data in cloud sheets (One Drive in our example, you can also use GSheets) and load them using the appropriate connector. You can choose the names and the type of content you want to include in your CV. I've created files for skills, experience, interests, personal data, etc., as seen below.

**Experience**: <br>
Choose the names and the content you want to showcase for your experience. I've included the links for companies and universities. 
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/experience.png){: .align-center}

**Personal Data**: <br>
Here, we list our personal information. I chose email, location, nationality, and age. I also incorporated today's date, birthday data in order to calculate the age integer (with div formula) every time the extract is refreshed.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/personal_data.png){: .align-center}

**Skills**: <br>
To provide the functionality of **filtering the skills per company with dashboard actions**, create the skills file including the name of the company in a **tall data** format.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/skills.png){: .align-center}

- Create a separate data source for every Excel file. I chose to create a new Excel file and not a new sheet (in the same doc) for every table I need. Feel free to migrate all your data into a single document.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/data_sources.png){: .align-center}

## Content
The type of content you want to include is up to you and your preference. Of course, there are some basic guidelines and things to avoid. In my case, I chose to include:<br>
1. **Photo** in the upper left corner along with a short text.
1. **Personal details** below the photo.
1. In the bottom left corner, we'll find **clickable logos** for LinkedIn, GitHub, etc.
The dashboard consists of 3 vizzes:
1. **Education & Professional experience** visualized with a Gantt chart. The Gantt chart includes details when hovering to showcase each role's achievements and details.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/experience_chart.png){: .align-center}
1. **Skills** that can be filtered when the user clicks each role's bar. The list will then filter out only the skills and technologies used in each role based on the company's tech stack and projects.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/skills_chart.png){: .align-center}
1. **Certifications** along with clickable logos for each provider that redirects the user to the corresponding certification's link.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/certifications_chart.png){: .align-center}

## Interaction
The workbook demonstrates some functionalities such as: 
1. **Redirecting to specific URLs**  when clicking icons for social links, certification links, personal data, etc. with Tableau **Dashboard Actions**.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/links_action.png){: .align-center}
1. As mentioned, **filtering the skills and technologies used in each role** based on the company's tech stack and projects.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/skills_action.png){: .align-center}
1. To use and match logos with providers, skills, and in general column values, we use custom shapes. Custom shapes in Tableau are fast and easy to use and provide the user unlimited control over mark shapes. Tableau shapes and controls can be found in the marks card to the right of the visualization window. There are plenty of options built into Tableau that can be found in the shape palette, but what if you want to use custom shapes for effect, branding, etc.? There is a folder in **"My Documents"**called **"My Tableau Repository"** where you can find a shapes folder. Within this shapes folder, simply create a new folder for your shapes and name it an informative name. Save any custom shapes you would like to use in your visualization into this file. To load your shapes, hit reload in your shapes palette and then select the new shapes folder from the drop-down menu.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/shapes.png){: .align-center}

# Summary

Putting all these together, below you can find my personal CV using Tableau.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/post_images/6. tableau dashboard/my_cv.png){: .align-center}

Crafting your CV with Tableau offers a unique opportunity to showcase your BI skills creatively while adhering to essential CV and visualization guidelines. By leveraging Tableau's dynamic features, you can artfully present your professional journey, skillset, and achievements in a visually compelling manner. Through imaginative yet structured visualizations, emphasize clarity, relevance, and a cohesive narrative. Ensure readability by using clear labels, concise descriptions, and intuitive design elements. Balance creativity with professionalism, incorporating industry-standard CV sections such as experience, education, and skills, while infusing innovation through interactive elements and engaging storytelling.