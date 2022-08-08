import {defineComponent, h, PropType, ref, Ref, watch} from "vue";
import {ElDivider, ElOption} from "element-plus/es";
import {defaultAppearance, defaultBackup} from "@util/constant/option";
import {ElSelect, ElTag} from "element-plus";
import {t} from "@app/locale";
import {renderOptionItem} from "@app/components/option/common";
import optionService from "@service/option-service";
import {toggle} from "@util/dark-mode";

const _default = defineComponent({
  name : "BackupOptionContainer",
  setup(props,ctx){
    // const option: Ref<timer.option.BackupOption> = ref(defaultAppearance())
    const options: Ref<timer.option.BackupOption> = ref(defaultBackup())
    console.log('value',options.value)
    ctx.expose({
      async reset() {
        options.value = defaultBackup()
        console.log('expose',options.value)
      }
    })

    const etag = h(ElTag, { size: 'small' }, () => options.value.mode)
    const select = h(ElSelect, {
          modelValue: options.value.mode,
          size: 'small',
          style: { width: '120px' },
          onChange: async (newVal: timer.option.BackupMode) => {
            const before = options.value.mode
            options.value.mode = newVal
            console.log('onChange 生效',before,options.value)
          }
        },{
          default :()=>['off','gist','google'].map(
              value => h(ElOption, { value, label: t(msg => msg.option.backup.options[value]) })
          )})
    const optionItem = renderOptionItem({
          input: etag
        },
            msg => msg.backup.title,
        t(msg => msg.option.backup.options['off']))

    return () => h('div',[
      h(ElDivider),
        optionItem,
      h(ElDivider),
      select,
        etag
    ])
  }
})

export default _default
