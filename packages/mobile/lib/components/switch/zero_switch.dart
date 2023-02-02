import 'package:flutter/material.dart';
import 'package:zero_ui_mobile/zero_ui_mobile.dart';

/// basic switch widget component with two states [true] and [false]
/// there are properties to customize the icon and colors of the switch
/// [activeIcon] and [inactiveIcon] are used to customize the icon of the switch
/// [activeColor] and [inactiveColor] are used to customize the background color of the switch
/// [activeThumbColor] and [inactiveThumbColor] are used to customize the thumb color of the switch
class ZeroSwitch extends StatefulWidget {
  /// background color of the switch when it is [true]
  /// default value is from [context.theme.primaryColor.light]
  final Color? activeColor;

  /// background color of the switch when it is [false]
  /// default value is [ZeroColors.neutral]
  final Color? inactiveColor;

  /// thumb color of the switch when it is [true]
  /// default value is from [context.theme.primaryColor]
  final Color? activeThumbColor;

  /// thumb color of the switch when it is [false]
  /// default value is [ZeroColors.neutral]
  final Color? inactiveThumbColor;

  /// callback function when the switch is tapped
  /// it returns the current state of the switch which is [true] or [false] as a parameter
  /// is required
  final Function(bool) onChanged;

  /// initial state of the switch when it is created
  /// default value is [false]
  final bool initialValue;

  /// disable the switch
  final bool isDisabled;

  /// custom icon of the switch when it is [true]
  final Icon? activeIcon;

  /// custom icon of the switch when it is [false]
  final Icon? inactiveIcon;

  const ZeroSwitch({
    super.key,
    this.activeColor,
    this.inactiveColor,
    this.activeThumbColor,
    this.inactiveThumbColor,
    required this.onChanged,
    this.initialValue = false,
    this.isDisabled = false,
    this.activeIcon,
    this.inactiveIcon,
  });

  @override
  State<ZeroSwitch> createState() => _ZeroSwitchState();
}

class _ZeroSwitchState extends State<ZeroSwitch> {
  final double _thumbSize = 22;
  bool _value = false;
  final _borderRadius = BorderRadius.circular(20);

  @override
  void initState() {
    super.initState();
    _value = widget.initialValue;
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      overlayColor: MaterialStateProperty.resolveWith<Color?>((Set<MaterialState> states) {
        return Colors.transparent;
      }),
      onTap: () {
        if (widget.isDisabled) return;
        setState(() {
          _value = !_value;
        });
      },
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Stack(
          alignment: Alignment.centerLeft,
          clipBehavior: Clip.none,
          children: [
            _inactiveLine(),
            _activeLine(),
            _thumb(),
          ],
        ),
      ),
    );
  }

  // inactive line
  Widget _inactiveLine() {
    Color inactiveColor;
    if (widget.isDisabled) {
      inactiveColor = context.theme.disabledBackgroundColor;
    } else {
      inactiveColor = widget.inactiveColor ?? ZeroColors.neutral[7];
    }
    return Container(
      width: _thumbSize * 1.5,
      height: _thumbSize / 1.5,
      decoration: BoxDecoration(
        borderRadius: _borderRadius,
        color: inactiveColor,
      ),
    );
  }

  // active line
  Widget _activeLine() {
    Color activeColor;
    if (widget.isDisabled) {
      activeColor = context.theme.disabledBackgroundColor;
    } else {
      activeColor = widget.activeColor ?? context.theme.primaryColor.light;
    }
    return AnimatedContainer(
      alignment: Alignment.centerLeft,
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeInOut,
      width: _value ? _thumbSize * 1.5 : _thumbSize / 1.5,
      height: _thumbSize / 1.5,
      decoration: BoxDecoration(
        borderRadius: _borderRadius,
        color: activeColor,
      ),
    );
  }

  // thumb
  Widget _thumb() {
    Color thumbColor;
    Icon? icon;
    if (_value) {
      thumbColor = widget.activeThumbColor ?? context.theme.primaryColor;
      icon = widget.activeIcon != null
          ? Icon(
              widget.activeIcon?.icon,
              color: widget.activeIcon?.color ?? ZeroColors.neutral[10],
              size: widget.activeIcon?.size ?? 15,
            )
          : null;
      if (widget.isDisabled) thumbColor = context.theme.disabledColor;
    } else {
      thumbColor = widget.inactiveThumbColor ?? ZeroColors.neutral[1];
      icon = widget.inactiveIcon != null
          ? Icon(
              widget.inactiveIcon?.icon,
              color: widget.inactiveIcon?.color ?? ZeroColors.neutral[10],
              size: widget.inactiveIcon?.size ?? 15,
            )
          : null;
      if (widget.isDisabled) thumbColor = context.theme.disabledColor;
    }
    return AnimatedPositioned(
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeInOut,
      left: !_value ? 0 - _thumbSize / 3 : _thumbSize / 1.25,
      child: Material(
        shape: RoundedRectangleBorder(
          borderRadius: _borderRadius,
        ),
        elevation: 2,
        child: Container(
          width: _thumbSize,
          height: _thumbSize,
          decoration: BoxDecoration(
            borderRadius: _borderRadius,
            color: thumbColor,
          ),
          child: Container(
            alignment: Alignment.center,
            child: icon,
          ),
        ),
      ),
    );
  }
}
