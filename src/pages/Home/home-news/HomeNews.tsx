import { News } from '@/constants/textConstant';
import CostalImage from '@/assets/images/Coastal_currents_estimated_from_tide_gauges.gif';
import SydneyImage from '@/assets/images/Sydney_to_Hobart_outlook.gif';
import FishSOOPImage from '@/assets/images/FishSOOP_taking_the_temperature.gif';
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
    <div className="max-w-8xl m-auto w-full">
      <div className="mb-4 flex flex-col justify-between gap-y-3 px-2 md:flex-row md:items-center">
        <h2 className="font-open-sans text-imos-dark-grey text-3xl font-medium md:text-4xl">{News.NEWS}</h2>

        <LinkOrAnchor
          to={APP_ROUTES.NEWS}
          className="border-imos-dark-grey text-imos-dark-grey flex w-full items-center justify-center rounded-lg border bg-white p-2 text-lg hover:opacity-75 md:w-[156px]"
        >
          {News.ALL_NEWS}
        </LinkOrAnchor>
      </div>

      <div className="grid w-full grid-cols-12 gap-5 lg:gap-20">
        {NEWS_DATA.map((news) => (
          <div
            key={news.title + news.authors + news.date}
            className="text-imos-dark-grey col-span-12 flex flex-col object-cover p-2 md:col-span-6 lg:col-span-4"
          >
            <img src={news.image} alt={news.title} className="h-80 self-center rounded-md object-contain" />
            <div className="text-body mt-3 flex justify-between gap-x-2 md:mt-6">
              <p>{news.authors}</p>
              <LinkOrAnchor to={news.link} className="inline-block hover:underline">
                {news.date}{' '}
              </LinkOrAnchor>
            </div>
            <h3 className="font-open-sans text-imos-dark-grey mt-3 text-lg font-bold">{news.title}</h3>
            <LinkOrAnchor to={news.link} className="mt-4 inline-block hover:underline lg:mt-6">
              <span className="text-imos-dark-grey text-[16px]">Read more </span>
              <ArrowWithTailIcon size="xs" className="inline" />
            </LinkOrAnchor>
          </div>
        ))}
      </div>
    </div>
  );
};
