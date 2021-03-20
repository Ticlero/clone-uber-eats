import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { EmailVar, MailModuleOptions } from './mail.interface';

// Module은 만들 때 2가지 옵션을 고려
// 하나는 다른 프로젝트에서도 사용할 수 있도록 생각하여 만들 수 있음
// 두번째는 현 프로젝트에 맞춰서 구체적으로 만들 수 있음
// 처음 모듈을 만들 때는, 현 프로젝트에 맞게 구체적으로 작성 후, 다른 프로젝트를 진행하면서 재사용 될 것 같으면 패키지로 만들어버려랏!
@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}
  // email을 보내기위해 MAILGUN의 CURL API를 사용
  // mailgun_API_KEY, domain, to
  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVar[],
    to: string,
  ) {
    const form = new FormData();
    form.append('from', `SH Nuber Eats <mailgun@${this.options.domain}>`);
    form.append('subject', subject);
    form.append('template', template);
    form.append('to', to);
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));
    //MAILGUN은 REST API Authorization을 Basic access authentication 방식을 사용
    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
    } catch (e) {
      console.log(e);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail(
      'test Email',
      'verify-email',
      [
        { key: 'code', value: code },
        { key: 'username', value: email },
      ],
      email,
    );
  }
}
