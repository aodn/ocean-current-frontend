import { News } from '@/constants/textConstant';
import CapstanVoyageImage from '@/assets/images/CAPSTAN_06_voyage_what_to_expect.webp';
import GoingToSeaImage from '@/assets/images/IMOS_OceanCurrent_is_going_to_sea.webp';
import ShowYourStripesImage from '@/assets/images/Show_Your_Stripes.webp';
import { ArrowWithTailIcon } from '@/components/Shared/Icons';
import { LinkOrAnchor } from '@/components/Shared';
import { APP_ROUTES } from '@/routers/routes';

const NEWS_DATA = [
  {
    title: 'CAPSTAN 06 voyage, from Bundaberg to Fraser Seamount – what to expect.',
    authors: 'Gabriela S. Pilo',
    date: '10.09.2026',
    image: CapstanVoyageImage,
    link: '/news#CAPSTAN_06_voyage_from_Bundaberg_to_Fraser_Seamount_what_to_expect',
  },
  {
    title: 'IMOS OceanCurrent is going to sea!',
    authors: 'Gabriela S. Pilo, Pier van der Merwe, Ben Arthur, and David Griffin',
    date: '24.07.2026',
    image: GoingToSeaImage,
    link: '/news#IMOS_OceanCurrent_is_going_to_sea',
  },
  {
    title: 'Show Your Stripes',
    authors: 'Gabriela S. Pilo',
    date: '19.06.2026',
    image: ShowYourStripesImage,
    link: '/news#ShowYourStripes',
  },
];

export const HomeNews = () => {
  return (
    <div className="max-w-8xl m-auto w-full px-2 md:px-6">
      <div className="mb-4 flex flex-col justify-between gap-y-3 px-2 md:flex-row md:items-center">
        <h2 className="font-open-sans text-imos-dark-grey text-3xl font-medium md:text-4xl">{News.NEWS}</h2>

        <LinkOrAnchor
          to={APP_ROUTES.NEWS}
          className="border-imos-dark-grey text-imos-dark-grey flex w-full items-center justify-center rounded-lg border bg-white p-2 text-lg hover:opacity-75 md:w-39"
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
            <img
              src={news.image}
              alt={news.title}
              loading="lazy"
              className="aspect-16/10 w-full rounded-md object-cover object-top"
            />
            <div className="text-body mt-3 flex justify-between gap-x-2 md:mt-6">
              <p className="truncate" title={news.authors}>
                {news.authors}
              </p>
              <LinkOrAnchor to={news.link} className="inline-block shrink-0 hover:underline">
                {news.date}{' '}
              </LinkOrAnchor>
            </div>
            <h3 className="font-open-sans text-imos-dark-grey mt-3 text-lg font-bold">
              <LinkOrAnchor to={news.link} className="hover:underline">
                {news.title}
              </LinkOrAnchor>
            </h3>
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
