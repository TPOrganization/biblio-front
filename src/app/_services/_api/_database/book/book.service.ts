import { Injectable } from '@angular/core'
import { ApiModelService } from '../api-model.service';
import { ApiUser } from 'src/app/_models/_services/_api/_database/user/user.models';
import { AppConfigService } from 'src/app/_services/app-config.service';
import { ApiBook, Book } from 'src/app/_models/_services/_api/_database/book/book.models';
import { ApiType, Type } from 'src/app/_models/_services/_api/_database/type/type.models';
import { ApiStatus, Status } from 'src/app/_models/_services/_api/_database/status/status.models';
import { Author } from 'src/app/_models/_services/_api/_database/author/author.models';

@Injectable({
  providedIn: 'root'
})

export class BookService extends ApiModelService<Book, ApiUser> {
  override entity = Book

  constructor(
    private readonly appConfigService: AppConfigService
  ) {
    super()
    this.path = appConfigService.config.API_PATH.BOOK
  }

  async getDataForChips(): Promise<{ types: Type[], status: Status[], author: Author[] }> {
    const { types, status, author }: { types: ApiType[], status: ApiStatus[], author: Author[] } = await this.axios.get({ path: `${this.path}/type-status-author` })

    return { types: types.map(e => new Type(e)), status: status.map(e => new Status(e)), author: author.map(e => new Author(e)) }
  }
}
