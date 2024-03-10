import React, {ChangeEvent} from 'react';
import {Route, Routes} from "react-router-dom";
import Form, {IRegion} from "./containers/form/Form";
import {SelectChangeEvent} from "@mui/material/Select";
import SignUp from "./containers/signUp/SignUp";
import SignIn from "./containers/signIn/SignIn";
import AppToolbar from "./components/toolbar/Toolbar";

export interface IState {
  handleChange?: (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    obj?: { name: string; hydra_id: number; } | null,
    dist?: { VALUE: string; ID: string; } | null,
  ) => void;
  handleImageChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  regions?: { name: string; hydra_id: number; }[];
  regions2?: { VALUE: string; ID: string; }[];
  cities?: { name: string; hydra_id: number; }[];
  districts?: { name: string; hydra_id: number; }[];
  districts2?: { VALUE: string; ID: string; }[];
  streets?: { name: string; hydra_id: number; }[];
  region?: { name: string; hydra_id: number; } | null;
  region2?: string;
  city?: { name: string; hydra_id: number; } | null;
  district?: { name: string; hydra_id: number; } | null;
  district2?: { VALUE: string; ID: string; };
  street?: { name: string; hydra_id: number; } | null;
  address?: string;
  orderStatus?: { VALUE: string; ID: string; };
  routerInstallationType?: { VALUE: string; ID: string; };
  tariff?: { VALUE: string; ID: string; };
  superTv?: { VALUE: string; ID: string; };
  passport?: File | null;
  passport2?: File | null;
  locationScreenShot?: File | null;
  description?: string;
  providerFrom?: { VALUE: string; ID: string; };
  username?: string;
  userSirName?: string;
  userPhoneNumber?: string;
  userAdditionalPhoneNumber?: string;
  orderStatuses?: IRegion[];
  routerInstallations?: IRegion[];
  tariffs?: IRegion[];
  providersFrom?: IRegion[];
  superTvs?: IRegion[];
  domoPhone?: string;
}

const App = () => {
  return (
    <div>
      <AppToolbar/>
      <Routes>
        <Route path='form' element={<Form/>}/>
        <Route path='sign-up' element={<SignUp/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
      </Routes>
    </div>
  );
};

export default App;