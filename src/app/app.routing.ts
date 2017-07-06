import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ConfiguratorComponent} from './components/configurator/configurator.component';
import {SelectorComponent} from './components/selector/selector.component';

const routes: Routes = [
    {path: 'configurator', component: ConfiguratorComponent},
    {path: 'selector', component: SelectorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
