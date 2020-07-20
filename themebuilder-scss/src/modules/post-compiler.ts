import CleanCSS, { Options } from 'clean-css';
import AutoPrefix from 'autoprefixer';
import PostCss from 'postcss';
import commonOptions from '../data/clean-css-options.json';
// eslint-disable-next-line import/extensions
import { browsersList } from '../data/metadata/dx-theme-builder-metadata';

export default class PostCompiler {
  static addBasePath(css: string | Buffer, basePath: string): string {
    const normalizedPath = `${basePath.replace(/[/\\]$/, '')}/`;
    return css.toString().replace(/(url\()("|')?(icons|fonts)/g, `$1$2${normalizedPath}$3`);
  }

  static addInfoHeader(css: string | Buffer, version: string): string {
    const generatedBy = '* Generated by the DevExpress ThemeBuilder';
    const versionString = `* Version: ${version}`;
    const link = '* http://js.devexpress.com/ThemeBuilder/';

    const header = `/*${generatedBy}\n${versionString}\n${link}\n*/\n\n`;
    const source = css.toString();
    const encoding = '@charset "UTF-8";';

    if (source.startsWith(encoding)) {
      return `${encoding}\n${header}${source.replace(`${encoding}\n`, '')}`;
    }
    return header + css;
  }

  static async cleanCss(css: string): Promise<string> {
    const promiseOptions: Options = { returnPromise: true };
    const options: Options = { ...(commonOptions as Options), ...promiseOptions };
    const cleaner = new CleanCSS(options);
    return (await cleaner.minify(css)).styles;
  }

  static async autoPrefix(css: string): Promise<string> {
    return (await PostCss(AutoPrefix({
      overrideBrowserslist: browsersList,
    })).process(css, {
      from: undefined,
    })).css;
  }
}
