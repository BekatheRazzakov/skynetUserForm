import React, {ChangeEvent} from 'react';
import {Route, Routes} from "react-router-dom";
import NewApplication, {IRegion} from "./containers/newApplication/NewApplication";
import {SelectChangeEvent} from "@mui/material/Select";
import SignUp from "./containers/signUp/SignUp";
import SignIn from "./containers/signIn/SignIn";
import AppToolbar from "./components/toolbar/Toolbar";
import MyApplications from "./containers/myApplications/MyApplications";
import Neactivka from "./containers/neactivka/Neactivka";
import {useAppSelector} from "./app/hooks";

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
  regionsLoading?: boolean;
  regions2Loading?: boolean;
  citiesLoading?: boolean;
  districtsLoading?: boolean;
  districts2Loading?: boolean;
  streetsLoading?: boolean;
}

const App = () => {
  const userToken = useAppSelector((state) => state.userState.user);

  return (
    <div>
      <AppToolbar/>
      <Routes>
        <Route path='*' element={userToken ? <MyApplications/> : <SignIn/>}/>
        <Route path='new-application' element={<NewApplication/>}/>
        <Route path='sign-up' element={<SignUp/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
        <Route path='my-applications' element={<MyApplications/>}/>
        <Route path='neactivka' element={<Neactivka/>}/>
      </Routes>
    </div>
  );
};

export default App;