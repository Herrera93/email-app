import {
  StorageActions,
  StorageActionTypes
} from '../actions/storage.actions';

export interface State {
  loading: boolean;
  fileMetadata: any | null;
  fileURL: string;
  error: string;
}

const initialState: State = {
  loading: false,
  fileURL: null,
  fileMetadata: null,
  error: null
};

export function reducer(
  state = initialState,
  action: StorageActions
): State {
  switch (action.type) {
    case StorageActionTypes.UploadFile: {
      return {
        ...state,
        loading: true,
      };
    }

    case StorageActionTypes.UploadFileSuccess: {
      return {
        ...state,
        loading: false,
        fileURL: action.payload,
      };
    }

    case StorageActionTypes.UploadFileFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    case StorageActionTypes.LoadMetadata: {
      return {
        ...state,
        loading: true
      }
    }

    case StorageActionTypes.LoadMetadataSuccess: {
      return {
        ...state,
        loading: false,
        fileMetadata: action.payload
      }
    }

    default: {
      return state;
    }
  }
}


export const getLoading = (state: State) => state.loading;

export const getFileURL = (state: State) => state.fileURL;

export const getFileMetadata = (state: State) => state.fileMetadata;