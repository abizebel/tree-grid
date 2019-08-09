import FlatTree from './Flat';
import CompositionTree from './Composition';


/**
 * Factory Pattern 
 * @description {an interface make decision how to create instance based on request}
 * Apply : OCP , SRP
 * 
 * فرض کنید کامپوننت گرید بر اساس دیتای فلت طراحی شود و آنگاه نیاز این باشد که دیتایی که از سمت سرور میآید کامپوزیت باشد 
 * باید در کد تغییر ایجاد کرد و به این ترتیب اصل او سی پی نقض میشود پس برای حل این مشل از الگوی فکتوری استفاده کرده
 * تا بر اساس نیاز مدل از کلاس مورد نظر شی مورد نظر را ساخته و در اختیار پروژه قرار بدین ترتیب در آینده هر نوع داده ای نیاز باشد
 * براحتی میتوان به آن اضافه کرد و همینطور با این کار اصل اس آر پی نیز تایید میشود زیرا هر کلاس وظیفه خود را انجام میدهد
 */
class TreeFactory {

  /**
   * @param {String} type
   * @param {String} childMapping - use for composition child type
   * @description {Create a instance based on our request}
   */
  create(type, mapping) {
    if (type == 'flat') {
      return new FlatTree(mapping)
    }
    else if (type == 'composition') {
      return new CompositionTree(mapping)
    }


  }

}

const TREE_FACTORY = new TreeFactory()
export default TREE_FACTORY;