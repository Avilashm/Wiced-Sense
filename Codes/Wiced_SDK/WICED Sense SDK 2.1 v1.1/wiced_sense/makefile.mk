#
# Copyright 2014, Broadcom Corporation
# All Rights Reserved.
#
# This is UNPUBLISHED PROPRIETARY SOURCE CODE of Broadcom Corporation;
# the contents of this file may not be disclosed to third parties, copied
# or duplicated in any form, in whole or in part, without the prior
# written permission of Broadcom Corporation.
#

########################################################################
# Application sources.
########################################################################
APP_SRC = wiced_sense.c l3gd20_driver.c hts221_driver.c lis3dsh_driver.c 
APP_SRC += lps25h_driver.c lsm303d_driver.c
APP_SRC += ws_sec_upgrade_ota.c ws_upgrade.c rsa_pub.c

########################################################################
################ DO NOT MODIFY FILE BELOW THIS LINE ####################
########################################################################
APP_PATCHES_AND_LIBS += application_poll_notification.a
APP_PATCHES_AND_LIBS += thread_and_mem_mgmt.a rtc_api.a
