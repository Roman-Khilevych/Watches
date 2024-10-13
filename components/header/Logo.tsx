import { ConfigModel } from '@/models/config';
import { getConfig } from '@/helpers/firebaseHelpers';

const Logo: React.FC = async () => {
  const config = (await getConfig()) as ConfigModel;

  return (
    <div className="flex items-center font-bold text-2xl md:text-4xl">
      <svg
        width="257.333"
        height="257.333"
        viewBox="0 0 257.333 257.333"
        preserveAspectRatio="xMidYMid meet"
        className="w-14 md:w-20 h-auto"
      >
        <path
          style={{ fill: 'transparent' }}
          d="M0 1927.56h1927.56V0H0v1927.56"
          transform="matrix(.13333 0 0 -.13333 0 257.333)"
        />
        <path
          style={{ fill: '#ffffff' }}
          d="m1319.23 1361.47 2.23 1.78c-12.9 14.67-26.24 29.34-40.91 43.12-122.26 122.27-269.87 183.62-442.812 183.62-172.949 0-321-61.35-443.707-183.62-9.781-9.78-19.558-20.45-28.898-31.12-1.336-.89-2.668-2.22-4.445-4l-.446-5.34c136.934 140.05 296.102 208.97 478.828 206.74 182.29-2.22 342.34-72.47 480.16-211.18M1464.62 963.113c0 8.891-.45 17.782-.89 26.231-20.46-131.156-87.14-256.531-199.63-376.129-112.92-120.039-257.42-180.504-433.034-182.281-176.5-.891-317.882 58.242-425.027 177.394-107.594 119.149-172.504 240.969-195.18 365.899v-11.114c-.445-172.945 60.911-320.554 183.172-442.816C516.738 397.59 664.789 336.234 837.738 336.234c172.942 0 320.552 61.356 442.812 184.063 122.71 122.262 184.07 269.871 184.07 442.816"
          transform="matrix(.13333 0 0 -.13333 0 257.333)"
        />
        <path
          style={{ fill: '#ffffff' }}
          d="m349.574 1341.02 473.492-549.965 895.414 786.925-896.304-587.304-472.602 350.344"
          transform="matrix(.13333 0 0 -.13333 0 257.333)"
        />
      </svg>
      <span className="font-watch-secondary font-light">{config.store.name}</span>
    </div>
  );
};

export default Logo;
