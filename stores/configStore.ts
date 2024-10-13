import { create } from 'zustand';
import { ConfigModel } from '@/models/config';
import { getConfig } from '@/helpers/firebaseHelpers';

interface ConfigState {
  config: ConfigModel | null;
  fetchConfig: () => Promise<void>;
}

export const useConfigStore = create<ConfigState>((set) => ({
  config: null,
  fetchConfig: async () => {
    const config = (await getConfig()) as ConfigModel;
    set({ config });
  },
}));
