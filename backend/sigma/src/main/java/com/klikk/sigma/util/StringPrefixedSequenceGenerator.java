package com.klikk.sigma.util;

import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.enhanced.SequenceStyleGenerator;
import org.hibernate.internal.util.config.ConfigurationHelper;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.Type;
import org.hibernate.type.spi.TypeConfiguration;

import java.io.Serializable;
import java.util.Properties;

public class StringPrefixedSequenceGenerator extends SequenceStyleGenerator {
    public static final String PREFIX_VALUE_PARAM="prefixValue";
    public static final String PREFIX_VALUE_DEFAULT="";
    private String prefixValue;

    public static final String NUMBER_FORMAT_PARAM="numberFormat";
    public static final String NUMBER_FORMAT_DEFAULT="%d";
    private String numberFormat;


    @Override
    public Serializable generate(SharedSessionContractImplementor session,Object object) throws HibernateException {
        return prefixValue+ String.format(numberFormat,super.generate(session,object));
    }

    @Override
    public void configure(Type type, Properties parameters, ServiceRegistry serviceRegistry) throws MappingException {
        super.configure(new TypeConfiguration().getBasicTypeRegistry().getRegisteredType(Long.class), parameters, serviceRegistry);
        prefixValue= ConfigurationHelper.getString(PREFIX_VALUE_PARAM,parameters,PREFIX_VALUE_DEFAULT);
        numberFormat=ConfigurationHelper.getString(NUMBER_FORMAT_PARAM,parameters,NUMBER_FORMAT_DEFAULT);
    }
}
