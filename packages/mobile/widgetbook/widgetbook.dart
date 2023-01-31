import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zero_ui_mobile/styles/theme.dart';

import 'widgetbook_component/avatar.dart';
import 'widgetbook_component/badge.dart';
import 'widgetbook_component/button.dart';
import 'widgetbook_component/button_group.dart';
import 'widgetbook_component/checkbox.dart';
import 'widgetbook_component/colors.dart';
import 'widgetbook_component/dropdown.dart';
import 'widgetbook_component/list_tile.dart';
import 'widgetbook_component/radio_group.dart';
import 'widgetbook_component/rating.dart';
import 'widgetbook_component/text.dart';
import 'widgetbook_component/slider.dart';
import 'widgetbook_component/textfield.dart';
import 'widgetbook_component/tooltip.dart';

class HotReload extends StatelessWidget {
  const HotReload({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Widgetbook.material(
      categories: [
        WidgetbookCategory(
          name: 'Foundation',
          widgets: [
            colorWidgetbookComponent,
            textWidgetbookComponent,
          ],
        ),
        WidgetbookCategory(
          name: 'Component',
          folders: [
            WidgetbookFolder(name: 'Input', widgets: [
              textFieldWidgetbookComponent,
              radioGroupWidgetbookComponent,
              dropdownWidgetbookComponent,
              checkboxWidgetbookComponent,
            ]),
            WidgetbookFolder(name: 'Button', widgets: [
              buttonWidgetbookComponent,
              buttonGroupWidgetbookComponent,
            ]),
          ],
          widgets: [
            ratingWidgetbookComponent,
            badgeWidgetbookComponent,
            tooltipWidgetbookComponent,
            listTileWidgetbookComponent,
            textWidgetbookComponent,
            sliderWidgetbookComponenet,
            avatarWidgetbookComponent
          ],
        ),
      ],
      appInfo: AppInfo(name: 'Zero UI'),
      themes: [
        WidgetbookTheme(
          name: 'Light',
          data: ZeroThemeData().toThemeData(),
        ),
      ],
    );
  }
}
