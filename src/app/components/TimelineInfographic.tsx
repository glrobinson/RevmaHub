import TimelineEventLeft from "../components/TimelineEventLeft";
import TimelineEventRight from "../components/TimelineEventRight";
import { useTranslation } from "../context/TranslationContext";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-10">
      <div className="flex flex-col w-full max-w-3xl px-4 sm:px-6 md:px-8">

<h1 className="text-3xl lg:text-3xl xl:text-4xl font-extrabold text-center mb-5">
  {t("Timeline.title")}
</h1>

<div className="flex flex-row">
  </div>
  <div className="w-5">
  </div>


<div className="flex flex-col">
  {/* Event 1  */}
<TimelineEventLeft imageSrc="/name_badge.png" altText="outdoor scene" 
                   date="1979" event={t("Timeline.events.1979.event")}
                   description={t("Timeline.events.1979.description")}
                    link="https://www.errc.org/roma-rights-journal/faces-of-romani-statelessness-in-greece"
                    linkDescription={t("Timeline.events.1979.linkDescription")}
                                />
{/* Event 2  */}
<TimelineEventRight imageSrc="/backpack.png" altText="outdoor scene"
                    date="1981" event={t("Timeline.events.1981.event")}
                    description={t("Timeline.events.1981.description")}
                    link="https://www.researchgate.net/publication/277043537_Teacher_training_in_Roma_education_in_Greece_Intercultural_and_critical_educational_necessities"
                    linkDescription={t("Timeline.events.1981.linkDescription")}
                              />
{/* Event 3  */}
<TimelineEventLeft imageSrc="/network.png" altText="outdoor scene"
                    date="1995" event={t("Timeline.events.1995.event")}
                    description={t("Timeline.events.1995.description")}
                    link="https://www.academia.edu/100971333/A_professional_narrative_of_Roma_mediation_in_Ilion_Greece_"
                    linkDescription={t("Timeline.events.1995.linkDescription")}
                              />

{/* Event 4  */}
<TimelineEventRight imageSrc="/person_report_icon.png" altText="outdoor scene" 
                    date="1996" event={t("Timeline.events.1996_1.event")}
                    description={t("Timeline.events.1996_1.description")}
                    link="https://rm.coe.int/first-report-on-greece/16808b578a"
                    linkDescription={t("Timeline.events.1996_1.linkDescription")}/>

{/* Event 5  */}
<TimelineEventLeft imageSrc="/policy.png" altText="outdoor scene"
            date="1996" event={t("Timeline.events.1996_2.event")}
            description={t("Timeline.events.1996_2.description")}
            link="https://www.errc.org/roma-rights-journal/not-enough-action-government-policy-on-roma-in-greece"
            linkDescription={t("Timeline.events.1996_2.linkDescription")}
                      />                   

{/* Event 6  */}
<TimelineEventRight imageSrc="/gradCap.png" altText="outdoor scene"
            date="1997" event={t("Timeline.events.1997.event")}
            description={t("Timeline.events.1997.description")}
            link="https://www.researchgate.net/publication/331080410_THE_EDUCATION_OF_ROMA_IN_GREECE"
            linkDescription={t("Timeline.events.1997.linkDescription")}
                      />

{/* Event 7  */}
<TimelineEventLeft imageSrc="/plan.png" altText="outdoor scene" 
                   date="2001" event={t("Timeline.events.2001_1.event")}
                   description={t("Timeline.events.2001_1.description")}
                   link="https://www.euromanet.eu/upload/36/58/Greek_Integrated_Action_Plan.pdf"
                   linkDescription={t("Timeline.events.2001_1.linkDescription")}/>

{/* Event 8  */}
<TimelineEventRight imageSrc="/greece_map.png" altText="outdoor scene" 
            date="2001" event={t("Timeline.events.2001_2.event")}
            description={t("Timeline.events.2001_2.description")}
            link="https://www.humanstories.gr/en/not-only-roma-first-of-all-greeks/"
            linkDescription={t("Timeline.events.2001_2.linkDescription")}/>

{/* Event 9  */}
<TimelineEventLeft imageSrc="/three_people.png" altText="outdoor scene" 
                    date="2012" event={t("Timeline.events.2012.event")}
                    description={t("Timeline.events.2012.description")}
                    link="https://commission.europa.eu/document/download/49f81e65-2b3f-44e5-bb42-c6bd63f7af1d_en?filename=greece_national_strategy_en.pdf"
                    linkDescription={t("Timeline.events.2012.linkDescription")}/>

{/* Event 10  */}
<TimelineEventRight imageSrc="/building.png" altText="outdoor scene"
                    date="2016" event={t("Timeline.events.2016_1.event")}
                    description={t("Timeline.events.2016_1.description")}
                    link="https://www.youtube.com/watch?v=W-BodPznjBY&t=9s"
                    linkDescription={t("Timeline.events.2016_1.linkDescription")}
                              />

{/* Event 11  */}
<TimelineEventLeft imageSrc="/jury.png" altText="outdoor scene"
                    date="2016" event={t("Timeline.events.2016_2.event")}
                    description={t("Timeline.events.2016_2.description")}
                    link="https://rm.coe.int/eleni-kallinikou-presentation-on-roma-policy-and-justrom-in-greece/1680969c53"
                    linkDescription={t("Timeline.events.2016_2.linkDescription")}
                              />                           
{/* Event 12  */}
<TimelineEventRight imageSrc="/communication.png" altText="outdoor scene"
                    date="2020" event={t("Timeline.events.2020.event")}
                    description={t("Timeline.events.2020.description")}
                    link="https://egroma.gov.gr/newsletter-1/"
                    linkDescription={t("Timeline.events.2020.linkDescription")}
                              />

{/* Event 13  */}
<TimelineEventLeft imageSrc="/document.png" altText="outdoor scene" 
                   date="2021" event={t("Timeline.events.2021.event")}
                   description={t("Timeline.events.2021.description")}
                   link="https://www.unicef.org/eca/sites/unicef.org.eca/files/2022-02/Greece%20-%20Roma%20children%2C%20multidimensional%20poverty%20and%20the%20Greek%20national%20strategy%20for%20Roma%20Inclusion.pdf "
                   linkDescription={t("Timeline.events.2021.linkDescription")}/>

  </div>

</div>
</div>
  );
};