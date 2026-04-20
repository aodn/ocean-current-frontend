import { News } from '@/constants/textConstant';
import CostalImage from '@/assets/images/Coastal_currents_estimated_from_tide_gauges.jpg';
import SydneyImage from '@/assets/images/Sydney_to_Hobart_outlook.jpg';
import FishSOOPImage from '@/assets/images/FishSOOP_taking_the_temperature.jpg';
import { ArrowWithTailIcon } from '@/components/Shared/Icons';
import { LinkOrAnchor } from '@/components/Shared';
import { APP_ROUTES } from '@/routers/routes';

const NEWS_DATA = [
  {
    title: 'Coastal currents estimated from tide gauges',
    authors: 'David Griffin, Madeleine Cahill, and Gabriela S. Pilo',
    date: '19.03.2026',
    image: CostalImage,
    link: '/news#Coastal_currents_estimated_from_tide_gauges',
  },
  {
    title: 'Sydney to Hobart outlook',
    authors: 'David Griffin',
    date: '22.12.2025',
    image: SydneyImage,
    link: '/news#Sydney_to_Hobart_outlook',
  },
  {
    title: 'FishSOOP: taking the temperature of the coastal ocean from fishing vessels',
    authors: 'David Griffin and Gabriela S. Pilo',
    date: '17.12.2025',
    image: FishSOOPImage,
    link: '/news#FishSOOP_taking_the_temperature_of_the_coastal_ocean_from_fishing_vessels',
  },
];

export const HomeNews = () => {
  return (
    <div className="m-auto w-full max-w-8xl">
      <div className="mb-4 flex flex-col justify-between gap-y-3 px-2 md:flex-row md:items-center">
        <h2 className="font-open-sans text-3xl font-medium text-imos-dark-grey md:mb-8 md:text-4xl">{News.NEWS}</h2>

        <LinkOrAnchor
          to={APP_ROUTES.NEWS}
          className="flex w-full items-center justify-center rounded-lg border border-imos-dark-grey p-2 text-lg text-imos-dark-grey md:w-fit md:border-none md:hover:underline"
        >
          {News.ALL_NEWS}
        </LinkOrAnchor>
      </div>

      <div className="grid w-full grid-cols-12 gap-5 lg:gap-10">
        {NEWS_DATA.map((news) => (
          <div
            key={news.title + news.authors + news.date}
            className="col-span-12 object-cover p-2 text-imos-dark-grey md:col-span-6 lg:col-span-4"
          >
            <img src={news.image} alt={news.title} className="h-auto w-full rounded-md object-cover" />
            <div className="mt-3 flex justify-between gap-x-2 text-body md:mt-6">
              <p>{news.authors}</p>
              <p>{news.date} </p>
            </div>
            <h3 className="mt-3 font-open-sans text-lg font-bold text-imos-dark-grey">{news.title}</h3>
            <LinkOrAnchor to={news.link} className="mt-4 inline-block hover:underline lg:mt-6">
              <span className="text-body text-imos-dark-grey">Read more </span>
              <ArrowWithTailIcon size="xs" className="inline" />
            </LinkOrAnchor>
          </div>
        ))}
      </div>
    </div>
  );
};
