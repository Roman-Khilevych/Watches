import { getConfig } from '@/helpers/firebaseHelpers';

const Footer: React.FC = async () => {
  const config = await getConfig();
  const footerCopyright = config?.store.copyright || '';
  const footerInfo = config?.store.info || '';

  return (
    <>
      <div className="bg-watch-gray4 text-[0.75rem] py-8 mt-24 shadow-watch-line-top">
        <div className="container" dangerouslySetInnerHTML={{ __html: footerInfo }} />
      </div>
      <footer className="bg-watch-primary text-watch-white p-4 shadow-watch-line-top">
        <p className="text-center">{footerCopyright}</p>
      </footer>
    </>
  );
};

export default Footer;
