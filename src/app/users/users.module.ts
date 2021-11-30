import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { ImagePipe } from './pipes/image.pipe';
import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './pages/search/search.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserComponent } from './pages/user/user.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    FormComponent,
    HomeComponent,
    ImagePipe,
    ListComponent,
    SearchComponent,
    UserComponent,
    UserCardComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    UsersRoutingModule,
  ],
})
export class UsersModule {}
