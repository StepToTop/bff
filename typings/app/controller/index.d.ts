// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAppService from '../../../app/controller/app_service';

declare module 'egg' {
  interface IController {
    appService: ExportAppService;
  }
}
