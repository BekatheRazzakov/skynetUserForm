import React, {ChangeEvent} from 'react';
import {Route, Routes} from "react-router-dom";
import Form, {IRegion} from "./containers/Form/Form";
import {SelectChangeEvent} from "@mui/material/Select";

export interface IState {
  handleChange?: (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    obj?: { name: string; hydra_id: number; } | null,
    dist?: { VALUE: string; ID: number; } | null,
  ) => void;
  handleImageChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  regions?: { name: string; hydra_id: number; }[];
  regions2?: string[];
  cities?: { name: string; hydra_id: number; }[];
  districts?: { name: string; hydra_id: number; }[];
  districts2?: { VALUE: string; ID: number; }[];
  streets?: { name: string; hydra_id: number; }[];
  region?: { name: string; hydra_id: number; } | null;
  region2?: string;
  city?: { name: string; hydra_id: number; } | null;
  district?: { name: string; hydra_id: number; } | null;
  district2?: { VALUE: string; ID: number; } | null;
  street?: { name: string; hydra_id: number; } | null;
  address?: string;
  orderStatus?: { VALUE: string; ID: number; } | null;
  routerInstallationType?: { VALUE: string; ID: number; } | null;
  tariff?: { VALUE: string; ID: number; } | null;
  superTv?: { VALUE: string; ID: number; } | null;
  passport?: File[];
  locationScreenShot?: File[];
  description?: string;
  providerFrom?: { VALUE: string; ID: number; } | null;
  username?: string;
  userSirName?: string;
  userPhoneNumber?: string;
  userAdditionalPhoneNumber?: string;
  orderStatuses?: IRegion[];
  routerInstallations?: IRegion[];
  tariffs?: IRegion[];
  providersFrom?: IRegion[];
  superTvs?: IRegion[];
}

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='form' element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;