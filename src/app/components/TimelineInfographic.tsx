import TimelineEventLeft from "../components/TimelineEventLeft";
import TimelineEventRight from "../components/TimelineEventRight";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-10">
      <div className="flex flex-col w-full max-w-3xl px-4 sm:px-6 md:px-8">

<h1 className="text-3xl lg:text-3xl xl:text-4xl font-extrabold text-center mb-5">
  Timeline of Policies Affecting Greek Roma
</h1>

<div className="flex flex-row">
  <div className="w-2 bg-gray-700">
  </div>
  <div className="w-5">
  </div>


<div className="flex flex-col">
  {/* Event 1  */}
<TimelineEventLeft imageSrc="/name_badge.png" altText="outdoor scene" 
                   date="1979" event="Ministry of the Interior Address Citizenship" 
                   description="On March 12, 1979, the National Directorate of the Ministry of the Interior issued an order to 
                                address the issue of so-called ‘stateless’ Roma. Despite generations lived in Greece, the majority 
                                of Greek Roma were not considered citizens up until this point as they did not have the necessary 
                                documentation such as birth certificates. This order began the process of providing a greater population 
                                of Greek Roma with the rights and benefits associated with citizenship. "
                    link="https://www.errc.org/roma-rights-journal/faces-of-romani-statelessness-in-greece"
                    linkDescription="Faces of Romani Statelessness in Greece"
                                />
{/* Event 2  */}
<TimelineEventRight imageSrc="/backpack.png" altText="outdoor scene"
                    date="1981" event="Greek State Takes Interest in Roma Children's Education" 
                    description="example event description"
                    link=""
                    linkDescription=""
                              />
{/* Event 3  */}
<TimelineEventLeft imageSrc="/network.png" altText="outdoor scene"
                    date="1995" event="ROM Network Established" 
                    description="Coinciding with the establishment of the Prime Minister’s Quality of Life Office, the ROM Network was a 
                                 nationwide initiative for the integration and political participation of Greek Roma. The organization consisted 
                                 of elected representatives from the Roma communities to serve as mediators and cooperate with Greek bureaucrats."
                    link="https://www.academia.edu/100971333/A_professional_narrative_of_Roma_mediation_in_Ilion_Greece_"
                    linkDescription="A professional narrative of Roma mediation in Ilion"
                              />

{/* Event 2  */}
<TimelineEventRight imageSrc="/person_report_icon.png" altText="outdoor scene" 
                    date="1996" event="Commision on Racism and Intolerance Publishes First Report" 
                    description="The Council of Europe’s ECRI published its first report on the state of racism and intolerance in Greece 
                                 in 1996. This report discusses legal provisions, social policies, and community relations of groups that 
                                 they categorized as experiencing ‘otherness’. These groups included Roma, Muslim, and immigrant 
                                 populations as vulnerable groups to be monitored. ECRI has continues to publish reports on Greece every 3-5 years."
                    link="https://rm.coe.int/first-report-on-greece/16808b578a"
                    linkDescription="First Report on Greece"/>

{/* Event 2  */}
<TimelineEventLeft imageSrc="/policy.png" altText="outdoor scene"
            date="1996" event="National Policy Framework for Greek Roma Established" 
            description="The Greek Government outlined the first comprehensive plan for addressing the multifaceted challenges faced by Greek Roma 
                         in 1996. The state acknowledged that while the Roma people had been living in Greece for centuries, their needs were not 
                         being met in areas including housing, education, and health. Children were provided with a ‘card for itinerant students’ 
                         to allow their entry into any public school. Despite its impressive outline, the framework failed to accomplish the majority 
                         of its goals in the designated timeframe. "
            link="https://www.errc.org/roma-rights-journal/not-enough-action-government-policy-on-roma-in-greece"
            linkDescription="Government Policy on Roma in Greece"
                      />                   

{/* Event 2  */}
<TimelineEventRight imageSrc="/gradCap.png" altText="outdoor scene"
            date="1997" event="University of Ioannina Begins Education Program" 
            description="The “Education of Roma Children” project was implemented by the University of Ioannina from 1997-1999. It attempted to 
                         combine the strategies of compulsory equal education and individualized support. Reception and support classes were 
                         established with specialized teaching material for Roma and other disadvantaged students."
            link="https://www.researchgate.net/publication/331080410_THE_EDUCATION_OF_ROMA_IN_GREECE"
            linkDescription="The Education of Roma in Greece"
                      />

{/* Event 3  */}
<TimelineEventLeft imageSrc="/plan.png" altText="outdoor scene" 
                   date="2001" event="Greece Adopts the Integrated Action Plan" 
                   description="In conjunction with the EU, Greece launched a comprehensive program regarding Roma welfare in 2001. 
                                The policy lasted from 2001-2008 and focused on providing infrastructure and services for Greek Roma. 
                                It primarily worked to develop integrated housing for improved living conditions, but also touched on education, 
                                healthcare, and employment. As many of the policies encompassed by the plan were designed as temporary solutions, 
                                social services were not consistent and many gaps remained."
                   link="https://www.euromanet.eu/upload/36/58/Greek_Integrated_Action_Plan.pdf"
                   linkDescription="Integrated Action Plan PowerPoint"/>

{/* Event 4  */}
<TimelineEventRight imageSrc="/greece_map.png" altText="outdoor scene" 
            date="2001" event="Formal adoption of the term “Greek Roma”" 
            description="In 2001, 46 branches of the Panhellenic Intermunicipal Network for the Support of Greek Roma (ROM Network) gather for a 
                         conference on “Expression of the existing consciousness and self-determination of Greek Roma.” Here, the group cemented 
                         their identity as integrally Greek and Roma. If a case arose in which they would be forced to choose between the two, they 
                         would unanimously eliminate the Roma identifier and remain solely Greek."
            link="https://www.humanstories.gr/en/not-only-roma-first-of-all-greeks/"
            linkDescription="Not Only Roma"/>

{/* Event 5  */}
<TimelineEventLeft imageSrc="/three_people.png" altText="outdoor scene" 
                    date="2012" event="Greece Adopts the National Strategy for Social Integration of Roma" 
                    description="As a follow-up to the 2001 Integrated Action Plan, Greece’s National Strategy was intended to comprehensively 
                                 evaluate the situation of Greek Roma. The project’s goal was to develop a plan for long-term solutions to key 
                                 areas of attention inclusion housing, education, employment, and health with the ultimate goal of ending the social 
                                 exclusion of Greek Roma. The plan is broken up into short-term (2012-2016), mid-term (2016-2020), and long-term (2020+) goals. 
                                 One major success in the short-term was an overall increase in school attendance, though a major gap was identified in preschool attendance rates."
                    link="https://commission.europa.eu/document/download/49f81e65-2b3f-44e5-bb42-c6bd63f7af1d_en?filename=greece_national_strategy_en.pdf"
                    linkDescription="National Strategy"/>

{/* Event 2  */}
<TimelineEventRight imageSrc="/building.png" altText="outdoor scene"
                    date="2016" event="Community Centers Established" 
                    description="In combination with the National Strategy, the Greek State established a network of community centers serving over 250 municipalities. 
                                 These centers provide services including obtaining government benefits, finding employment, and navigating educational systems. A portion 
                                 of these centers have branches specifically for Roma communities with further specialized services to promote their general social integration."
                    link="https://www.youtube.com/watch?v=W-BodPznjBY&t=9s"
                    linkDescription="Community Centers Video"
                              />

{/* Event 2  */}
<TimelineEventLeft imageSrc="/jury.png" altText="outdoor scene"
                    date="2016" event="Special Secretariat for Social Inclusion of Roma Established" 
                    description="The Special Secretariat for Social Inclusion of Roma is a government body established under the Ministry of Labor, Social Security, and Social 
                                 Solidarity in 2016. The agency corporates with other Ministries, Roma mediators, and private organizations to develop frameworks and establish 
                                 policies for Roma social inclusion."
                    link="https://rm.coe.int/eleni-kallinikou-presentation-on-roma-policy-and-justrom-in-greece/1680969c53"
                    linkDescription="Presentation on Roma Policy"
                              />                           
{/* Event 2  */}
<TimelineEventRight imageSrc="/communication.png" altText="outdoor scene"
                    date="2020" event="Development of the National Contact Point for Social Inclusion of Roma" 
                    description="The project “Development of the National Contact Point for Social Inclusion of Roma” or “RomPlat2019” was created by the Secretariat for Social 
                                 Inclusion of Roma for the years 2020-2028. The project’s goal is to cultivate dialogue among Roma and non-Roma communities to establish effective 
                                 local collaboration for implementation of Greece’s National Strategy. During this time, the Secretariat also became the EU National Contact Point 
                                 for Roma issues in Greece."
                    link="https://egroma.gov.gr/newsletter-1/"
                    linkDescription="RomPlat2019 Newsletter"
                              />

{/* Event 6  */}
<TimelineEventLeft imageSrc="/document.png" altText="outdoor scene" 
                   date="2021" event="Greece Adopts an Updated National Strategy " 
                   description="The National Strategy and Action Plan for Roma inclusion 2021-2030 addresses similar key areas to the 2012 plan including education, discrimination, and 
                                infrastructure. It combines targeted actions with a broader approach for more sustainable operations and connects with other national plans such 
                                as those for gender equality and children’s rights. The new strategy also ensures the involvement of Roma community leaders and representatives."
                   link="https://www.unicef.org/eca/sites/unicef.org.eca/files/2022-02/Greece%20-%20Roma%20children%2C%20multidimensional%20poverty%20and%20the%20Greek%20national%20strategy%20for%20Roma%20Inclusion.pdf "
                   linkDescription="National Strategy and Action Plan PowerPoint"/>

  </div>

</div>
</div>
    </div>

  );
};